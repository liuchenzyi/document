import {Client} from 'basic-ftp'
import fs from 'fs'
import path from 'path'

// 测试 FTP
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const getFrame = () => {
    let count = 0
    return frames[count++ % frames.length]
}

const log = (content: string) => {
    process.stdout.clearLine(0);  // 清除当前行
    process.stdout.cursorTo(0);   // 将光标移回到行首
    process.stdout.write(content);  // 每次从最右侧输出
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
    readonly _backup: boolean = false

    readonly host: string = 'localhost'
    readonly port: number = 21
    readonly user: string = 'Administrator'
    readonly password: string = '111233'

    constructor(option: Option) {
        this.client = new Client()
        this.remoteDirPath = option.remoteDirPath
        this.localDirPath = option.localDirPath
        this._backup = option.backup
        this.backupPath = option.backupPath
        this.host = option.host
        this.port = option.port
        this.user = option.user
        this.password = option.password
    }

    async assess() {
        try {
            await this.client.access({
                host: this.host,
                user: this.user,
                password: this.password,
                // secure: true
            })
            console.log('\x1B[32m √  Successful connection to ftp server \x1B[0m')
        } catch (e) {
            console.log('\x1B[32m √  Failed to access Ftp service \x1B[0m')

            console.log(e.code, e.message)
            throw e
        }

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
        if (!this.backupPath) {
            const date = new Date()
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}@${date.getHours()}:${date.getMinutes()}-${date.getSeconds()}`
        }

        if (this.backupPath instanceof Function) {
            return this.backupPath()
        }
        return this.backupPath
    }

    async backup() {
        // 判断文件夹是否存在

        // 获取当前时间，作为默认备份路径，使用原生Date 对象，不使用第三方库
        try {
            const result = await this.client.rename(this.remoteDirPath, this.getBackupPath())
            console.log('\x1B[32m √  Data Backup Successful \x1B[0m')
        } catch (e) {
            console.log('\x1B[31m ! Data backup failed \x1B[0m')
            console.log(e.code, e.message)
        }
    }

    async upload() {
        const size = getDirSize(this.localDirPath)

        const sizeFormat = bytesToSize(size)

        this.client.trackProgress(info => {
            const progress = `${(100 * (info.bytesOverall / size)).toFixed(2)}`
            log(`${getFrame()}  ${progress} %    ${bytesToSize(info.bytesOverall)}/${sizeFormat} Uploading... ${info.name} `)
        })
        console.log('\x1B[32m √  Start uploading data \x1B[0m')
        await this.client.uploadFromDir(this.localDirPath, this.remoteDirPath)


        log('\x1B[32m √ finish upload \x1B[0m')
    }

    // 部署
    async deploy() {
        console.log('Start deploying...')

        try {
            await this.assess()

            await this.client.ensureDir(this.remoteDirPath)  // 确保远程目录存在

            await this.client.cdup()  // 回到上一级目录

            // 备份
            if (this._backup) {
                await this.backup()
            }

            await this.upload()
            // 打印结果

        } catch (e) {
            console.error('部署失败')
        } finally {
            this.client.close()
        }
    }
}

/**
 * 递归计算目录的总大小
 * @param dirPath 目录路径 - 指定要计算大小的目录
 * @returns {number} 返回目录的总大小（以字节为单位）
 */
const getDirSize = (dirPath: string) => {
    // 读取目录中的所有文件和子目录
    const files = fs.readdirSync(dirPath)
    let size = 0
    files.forEach(file => {
        const filePath = path.join(dirPath, file)
        // 获取文件或子目录的元数据
        const stat = fs.statSync(filePath)
        if (stat.isFile()) {
            size += stat.size
        } else if (stat.isDirectory()) {
            size += getDirSize(filePath)
        }
    })
    return size
}


// 格式化大小字符串，按照 b kb mb gb tb 的单位进行格式化
const bytesToSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    // ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (bytes < 1024) {
        return `${bytes} b`
    }
    if (bytes < 1024 ** 2) {
        return `${(bytes / 1024).toFixed(2)} Kb`
    }
    if (bytes < 1024 ** 3) {
        return `${(bytes / 1024 ** 2).toFixed(2)} Mb`
    }
    if (bytes < 1024 ** 4) {
        return `${(bytes / 1024 ** 3).toFixed(2)} Gb`
    }
    return `${(bytes / 1024 ** 4).toFixed(2)} Tb`
}

const ftpDeploy = new FtpDeploy({
    host: '10.126.126.3',
    user: 'Administrator',
    password: '111233',
    remoteDirPath: 'dist',
    localDirPath: '../../dist',
    backup: true,
})
ftpDeploy.deploy()