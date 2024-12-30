import { Client } from 'basic-ftp'

import fs from 'fs'
import path  from 'path'
// 测试 FTP
const frames =  ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const log = (content: string) => {
	process.stdout.clearLine(0);  // 清除当前行
	process.stdout.cursorTo(0);   // 将光标移回到行首
	process.stdout.write(content );  // 每次从最右侧输出
}

let count = 0
const test = async () => {
	const client = new Client()
	client.ftp.verbose = false  //所有套接字通信的调试级日志记录

	const size = getDirSize('../../dist')
	const sizeStr = formatSize(size)
	client.trackProgress(info => {
		// console.log("File", info.name)
		// console.log("Type", info.type)
		// console.log("Transferred", info.bytes)
		// console.log("Transferred Overall", info.bytesOverall)
		// console.log(`已上传 ${formatSize(info.bytesOverall)},共 ${sizeStr} 进度 ${ (info.bytesOverall/size).toFixed(2) }`, )
		// 清空上一次输出的内容

		const progress = `${ (100 * (info.bytesOverall / size)).toFixed(2) }`

		log(`${frames[count++ % frames.length]}  ${progress} %   共 ${sizeStr} 已上传 ${formatSize(info.bytesOverall)} Uploading... ${info.name} `)
	})
	try {
		await client.access({
			host: "10.126.126.3",
			user: "Administrator",
			password: "111233",
			// secure: true
		})
		// console.log(await client.list())
		// await client.downloadTo("local.config", "output/web.config")
		// await client.uploadFrom("local.config", "output/web-copy.config")



		await client.uploadFromDir("../../dist", "output/dist2")


		log('√ finish upload')

		// await client.rename('output/dist2', 'output/dist3')

	} catch(err) {
		console.log(err)
	}
	client.close()
}




interface Option {
	// host: string

	readonly host?: string
	readonly port?: number
	readonly user?: string
	readonly password?: string
	readonly secure?: boolean | "implicit"
	// readonly secureOptions?: TLSConnectionOptions

	remoteDirPath: string  // 远程服务器目录

	localDirPath: string  // 本地包路径
	
	backup?: boolean   // 是否备份

	backupPath?: string | (() => string) // 备份路径 名称  默认 当前时间 YYYY-MM-DD-HH-mm-ss
}

class FtpDeploy {
	readonly client: Client
	readonly remoteDirPath: string = 'dist'  // 默认 dist
	readonly localDirPath: string = 'dist'  // 默认 dist
	readonly backupPath: string | (() => string) = 'backup' // 默认 dist

	constructor( option: Option) {
		this.client = new Client()
		this.remoteDirPath = option.remoteDirPath 
	}

	assess() {
	}
	/**
	 * 获取备份路径的方法
	 *
	 * 当没有设置备份路径时，自动生成一个基于当前时间的路径
	 * 如果备份路径被设置为一个函数，那么将调用该函数来获取路径
	 * 否则，直接返回已设置的备份路径
	 *
	 * @returns {string} 生成的或已设置的备份路径
	 */
	getBackupPath(): string {
		if(!this.backupPath){
			const date = new Date()
			return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
		}
		
		if(this.backupPath instanceof Function){
			return this.backupPath()
		}
		return this.backupPath
	}

	async backup() {
		// 获取当前时间，作为默认备份路径，使用原生Date 对象，不使用第三发方库
		try {
			const result = await this.client.rename(this.remoteDirPath, this.getBackupPath())
		}catch(e) {
			console.log(e)
			console.log('备份失败')
		}
	}
	// 部署
	async deploy() {
		try {
			const result = await this.client.uploadFromDir(this.localDirPath, this.remoteDirPath)
		}catch(e) {
			console.log(e)
			console.log('部署失败')
		}
	}
}

// 获取文件夹内所有文件大小，包含子文件夹里边的内容
const getDirSize = (dirPath: string) => {
	const files = fs.readdirSync(dirPath)
	let size = 0
	files.forEach(file => {
		const filePath = path.join(dirPath, file)
		const stat = fs.statSync(filePath)
		if(stat.isFile()) {
			size += stat.size
		}else if(stat.isDirectory()) {
			size += getDirSize(filePath)
		}
	})
	return size
}


// 格式化大小字符串，按照 b kb mb gb tb 的单位进行格式化
const formatSize = (size: number) => {
	if(size < 1024) {
		return `${size} b`
	}
	if(size < 1024 ** 2) {
		return `${(size / 1024).toFixed(2)} Kb`
	}
	if(size < 1024 ** 3) {
		return `${(size / 1024 ** 2).toFixed(2)} Mb`
	}
	if(size< 1024 ** 4){
		return `${(size / 1024 ** 3).toFixed(2)} Gb`
	}
	return `${(size / 1024 ** 4).toFixed(2)} Tb`
}

test()
log('\x1B[32m ✓  \x1B[36m  3065 modules transformed.')
