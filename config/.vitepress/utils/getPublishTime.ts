import {glob} from 'glob';
import path from 'path';
import {fileURLToPath} from 'url';
import matter from 'gray-matter';
import fs from 'fs';
import {execSync} from 'child_process';
import dayjs from "dayjs";
// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件所在的目录路径
const __dirname = path.dirname(__filename);

// 指定目录路径
const directoryPath = path.resolve(__dirname, '../../../docs'); // 根据实际情况调整路径


const writeToFile = (filePath: string, content: string) => {
    fs.writeFile(filePath, content, 'utf8', err => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err);
        } else {
            console.log(`The published  time had been added to ${filePath}`);
        }
    });
}


/**
 * 获取文件的首次提交时间
 * 如果文件在git历史中不存在提交记录，则获取文件的创建时间
 *
 * @param filePath 文件路径
 * @returns 返回文件的首次提交时间或创建时间，格式为YYYY-MM-DD HH:mm:ss
 */
const getFirstCommitTime = (filePath: string) => {
    try {
        const [date = ''] = execSync(
            `git log --reverse --format=%ai -- ${filePath}`,
            {
                encoding: 'utf8'
            }
        ).split('\n')

        if (date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        } else {
            // 获取本地文件创建时间
            return getFileBirthtime(filePath)
        }
    } catch (error) {
        console.error(`Error getting first commit for file ${filePath}:`, error);
        throw error;
    }
}
/**
 * 获取文件的创建时间
 * 在某些系统上，文件的创建时间（birthtime）可能无法正确获取，因此使用当前时间作为为替代
 *
 * @param filePath 文件路径
 * @param format 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
const getFileBirthtime = (filePath: string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
    try {
        const stat = fs.statSync(filePath);
        // 在一些系统下无法获取birthtime属性的正确时间，使用当前时间代替
        if (stat.birthtime.getFullYear() === 1970) {
            return dayjs().format(format)
        }
        return dayjs(stat.birthtime).format(format)
    } catch (e) {
        console.error(`Error getting birthtime`, e)
        return dayjs().format(format)
    }
}

/**
 * 用于处理指定目录下的所有Markdown文件，并为缺少日期信息的文件添加日期
 * @param directoryPath 指定的目录路径
 */
const main = async (directoryPath: string) => {

    // 使用 glob 模块获取所有 Markdown 文件

    const files = await glob('**/*.md', {cwd: directoryPath})


    files.forEach(file => {
        const filePath = path.join(directoryPath, file);

        const content = fs.readFileSync(filePath, 'utf8');

        const {data} = matter(content)

        const {date} = data

        // 如果文件没有日期信息，则添加日期,有则不添加
        if (!date) {
            const date = getFirstCommitTime(filePath)
            // 将文件创建时间添加 到 front matter 中
            const newContent = matter.stringify(content, {...data, date})
            writeToFile(filePath, newContent)
        }
    })
}

main(directoryPath)

