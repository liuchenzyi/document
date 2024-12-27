import { Client } from 'basic-ftp'


// 测试 FTP

const test = async () => {
	const client = new Client()
	client.ftp.verbose = true  //所有套接字通信的调试级日志记录
	try {
		await client.access({
			host: "server",
			// user: "very",
			// password: "password",
			// secure: true
		})
		// console.log(await client.list())
		// await client.downloadTo("local.config", "output/web.config")
		// await client.uploadFrom("local.config", "output/web-copy.config")
		// await client.uploadFromDir("../../dist", "output/dist2")

		await client.rename('output/dist2', 'output/dist3')

	} catch(err) {
		console.log(err)
	}
	client.close()
}

test()


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