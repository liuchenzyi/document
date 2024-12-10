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

/** 获取文件创建时间 */
function getFileBirthime(filePath) {
	const gitFileInitTime = execSync(`git log --follow --format=%ad -- ${filePath}`, {
		encoding: 'utf8'
	}).split('\n').filter(line => line.trim()).pop();
	// console.log(gitFileInitTime);
	if (gitFileInitTime) {
		return new Date(gitFileInitTime);
	}
	const stat = fs.statSync(filePath);
	return getSystemBirthtime(stat);
}

// 获取系统文件创建时间
function getSystemBirthtime(stat) {
	// 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
	return stat.birthtime.getFullYear() !== 1970 ? stat.birthtime : stat.atime;
}

// 使用 glob 模块获取所有 Markdown 文件
glob('**/*.md', {cwd: directoryPath}).then(files => {
	// console.log(files);
	files.forEach(file => {
		const filePath = path.join(directoryPath, file);
		fs.readFile(filePath, 'utf8', (err, content) => {
			if (err) {
				console.error(`Error reading file ${filePath}:`, err);
				return;
			}
			console.log(`Content of ${filePath}:`);
			// console.log(content);

			const {data} = matter(content)

			const {date} = data

			if (!date) {
				const data = getFileBirthime(filePath)
				const r = dayjs(data).format('YYYY-MM-DD HH:mm:ss')

				// 将文件创建时间添加 到 front matter 中
				const newContent = matter.stringify(content, {...data,date: r})

				// 写入文件
				fs.writeFile(filePath, newContent, 'utf8', err => {
					if (err) {
						console.error(`Error writing file ${filePath}:`, err);
					} else {
						console.log(`File ${filePath} has been updated.`);
					}
				});

				console.log(newContent)

			}
			// console.log(date)
		});
	});
	// 获取对应的文件并打印
});