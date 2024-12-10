import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import fs from 'fs';
import { execSync } from 'child_process';
import dayjs from "dayjs";
// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件所在的目录路径
const __dirname = path.dirname(__filename);

// 指定目录路径
const directoryPath = path.resolve(__dirname, '../../../docs'); // 根据实际情况调整路径



/**
 * Writes content to a specified file.
 *
 * This function uses the fs.writeFile method to write a given string content to a specified file path.
 * If the write operation is successful, it logs a success message to the console; if an error occurs,
 * it logs an error message to the console.
 *
 * @param filePath The path of the file to write. If the file does not exist, it will be created.
 * @param content The content to write to the file, which must be a string.
 */
const writeToFile = (filePath: string, content: string) => {
	fs.writeFile(filePath, content, 'utf8', err => {
		if (err) {
			console.error(`Error writing file ${filePath}:`, err);
		} else {
			console.log(`File ${filePath} has been updated.`);
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
const getFirstCommitTime =  (filePath: string) => {
	try {
		const date = execSync(
			`git log --follow --format=%ad -- ${ filePath }`,
			{
				encoding: 'utf8'
			}
		)
			.split('\n')
			.filter(line => line.trim())
			.pop();

		if(date) {
			return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
		} else {
			// 获取本地文件创建时间
			return getFileBirthtime(filePath)
		}
	} catch(error ) {
		console.error(`Error getting first commit for file ${filePath}:`, error);
		throw error;
	}
}
/**
 * 获取文件的创建时间
 * 在某些系统上，文件的创建时间（birthtime）可能无法正确获取，因此使用访问时间（atime）作为替代
 *
 * @param filePath 文件路径
 * @param format 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
const getFileBirthtime = (filePath: string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
	const stat = fs.statSync(filePath);
	// 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
	const date = stat.birthtime.getFullYear() !== 1970 ? stat.birthtime : stat.atime;
	return dayjs(date).format(format)
}

/**
 * 从内容字符串中获取 Front Matter 数据
 *
 * 该函数使用 `matter` 库处理内容字符串，提取其中的 Front Matter 数据
 * Front Matter 通常用于在文件顶部存储元数据，如标题、日期、作者等
 *
 * @param content 文件内容字符串，包含 Front Matter
 * @returns 返回提取的 Front Matter 数据
 */
const getFrontMatter = (content: string) => {
	const {data} = matter(content)
	return data
}
/**
 * 用于处理指定目录下的所有Markdown文件，并为缺少日期信息的文件添加日期
 * @param directoryPath 指定的目录路径
 */
const main = async(directoryPath: string) => {

	// 使用 glob 模块获取所有 Markdown 文件

	const files = await glob('**/*.md', {cwd: directoryPath})

	let i = 0

	console.log(`共 找到 ${files.length} 个 md 文件`)

	files.forEach(file => {
		const filePath = path.join(directoryPath, file);

		const content = fs.readFileSync(filePath, 'utf8');

		const data = getFrontMatter(content)

		const {date} = data

		console.log(date)

		if(!date) {
			const date = getFirstCommitTime(filePath)
			// 将文件创建时间添加 到 front matter 中
			const newContent = matter.stringify(content, {...data, date})

			writeToFile(filePath, newContent)

			i++
			console.log(`已成功将 日期 写入${file} 文件 `)
		}
	})

	console.log(`已 成功为${i} 个文件添加date 数据`)
}

main(directoryPath)