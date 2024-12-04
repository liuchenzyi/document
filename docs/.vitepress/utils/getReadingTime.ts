/**
 * 从给定的字符串内容中提取出所有的英文单词
 *
 * 此函数通过正则表达式匹配来实现英文单词的提取，确保提取过程中忽略标点符号和纯数字
 *
 * @param content {string} - 输入的字符串内容，从中提取英文单词
 * @returns {RegExpMatchArray | null} - 返回一个数组，包含所有匹配的英文单词如果没有任何匹配，则返回null
 */
export function getWords(content: string): RegExpMatchArray | null {
    // 仅匹配英文单词，忽略标点和纯数字
    return content.match(/\b[a-zA-Z]+(?:['-]?[a-zA-Z]+)?\b/gu)
}
/**
 * 从给定的字符串内容中提取所有的中文字符
 *
 * 此函数使用正则表达式来匹配 Unicode 范围内的所有中文字符
 * Unicode 范围从 \u4E00 到 \u9FD5 包含了大部分的中文字符
 * 'g' 标志表示全局匹配，找到所有匹配的字符而不是在找到第一个后就停止
 * 'u' 标志表示在 Unicode 模式下进行正则表达式匹配
 *
 * @param content 字符串内容，从中提取中文字符
 * @returns 返回一个包含所有匹配的中文字符的数组，如果没有找到则返回 null
 */
export function getChinese(content: string): RegExpMatchArray | null {
    return content.match(/[\u4E00-\u9FD5]/gu)
}
/**
 * 获取英文单词数量
 *
 * 本函数旨在统计给定字符串中的英文单词数量英文单词由空格分隔
 * 如果内容为空或不存在，则返回0
 *
 * @param content 输入的字符串，可能包含英文单词
 * @returns 返回英文单词的数量
 */
export function getEnWordCount(content: string): number {
    return getWords(content)?.length || 0
}
/**
 * 获取字符串中的中文字符数量
 * @param content 输入的字符串
 * @returns 中文字符的数量
 */
export function getCnWordCount(content: string): number {
    // 中文字符数量
    return getChinese(content)?.length || 0
}
/**
 * 获取内容中的总字数
 * 该函数通过计算英文和中文字数的和来得到总字数
 * @param content 要统计字数的内容
 * @returns 总字数
 */
export function getWordNumber(content: string): number {
    // 总字数统计
    const enWordCount = getEnWordCount(content)
    const cnWordCount = getCnWordCount(content)
    return enWordCount + cnWordCount
}
/**
 * 计算给定内容的阅读时间
 *
 * 此函数根据内容中的中英文单词数量，计算出阅读该内容大约需要的时间
 * 它首先去除内容两端的空白，然后分别计算英文和中文的单词数
 * 根据给定的每分钟阅读的中英文单词数，计算出总阅读时间
 *
 * @param content 要计算阅读时间的内容
 * @param cnWordPerMinute 每分钟阅读的中文单词数，默认为350
 * @param enWordPerMinute 每分钟阅读的英文单词数，默认为160
 * @returns 返回一个对象，包含阅读时间和内容的总单词数
 */
export function getReadingTime(content: string, cnWordPerMinute = 350, enWordPerMinute = 160) {
    // 去除内容两端的空白
    const trimmedContent = content.trim()
    const enWord = getEnWordCount(trimmedContent)
    const cnWord = getCnWordCount(trimmedContent)

    const totalWords = enWord + cnWord
    // 根据总单词数，如果大于等于1000，以千字为单位表示，否则直接显示总单词数
    const words = totalWords >= 1000 ? `${Math.round(totalWords / 100) / 10}k` : totalWords
    // 计算阅读时间，中文单词数除以每分钟阅读的中文单词数，加上英文单词数除以每分钟阅读的英文单词数
    const readingTime = cnWord / cnWordPerMinute + enWord / enWordPerMinute
    const readTime = Math.ceil(readingTime)

    return {
        readTime,
        words,
    }
}