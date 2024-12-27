import {Client} from 'basic-ftp'

// console.log('start',Client)

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

    } catch (err) {
        console.log(err)
    }
    client.close()
}

test()

const backup = async () => {
    const client = new Client()


}

class FtpUtils {

}