const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const fileReadPromise: FileReadPromise = function<T>(absolutePath: string): T | Promise<T> {
    return new Promise((resolve: ResolveFileFn<T>, reject?: RejectFileFn) => {
        fs.readFile(absolutePath, (err: Error | undefined, data: Buffer) => {
            if (err && reject) {
                reject(err);
            }
            try {
                resolve(JSON.parse(data.toString()));
            } catch (err) {
                reject && reject(err || new Error(`读取文件${absolutePath}错误！`));
            }
        });
    });
};

export const readFile: ReadFile = async (filePath: string): Promise<Array<FileData>> => {
    const result: Array<FileData> = [];
    let data: FileData = {next: filePath, message: ''};
    let absolutePath = null;
    while (data && data.next) {
        try {
            data = await fileReadPromise<FileData>(absolutePath || filePath);
        } catch (err) {
            throw err;
        }
        if (data) {
            if (data.next) {
                absolutePath = path.join(filePath, '../', data.next);
            }
            result.push(data);
        }
    }
    return result;
};

const getFullFileName = (fileName: string): string => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
        return path.resolve(__dirname, '../log', fileName); // 相对dist目录而言
    }
    return path.resolve(__dirname, '../../log', fileName);
};

const getWriteStream = (fileName: string): any => {
    const fullName: string = getFullFileName(fileName);
    const writeStream = fs.createWriteStream(fullName, {
        flags: 'a', //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
        encoding: 'utf8', //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
        fd: null, //fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
        mode: '0666',
        autoClose: true //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
    });
    writeStream.on('error', (err: Error) => {
        throw err;
    });
    return writeStream;
};

export const writeAccessLog = (log: string): Promise<boolean> => {
    const accessWriteStream = getWriteStream('access.log');
    return new Promise((resolve, reject) => {
        try {
            return accessWriteStream.write(log + '\n', resolve);
        } catch (err) {
            reject(err);
        }
    });
};

export const writeErrorLog = (log: string): Promise<boolean> => {
    const accessWriteStream = getWriteStream('error.log');
    return new Promise((resolve, reject) => {
        try {
            return accessWriteStream.write(log + '\n', resolve);
        } catch (err) {
            reject(err);
        }
    });
};

export const writeEventLog = (log: string): Promise<boolean> => {
    const accessWriteStream = getWriteStream('event.log');
    return new Promise((resolve, reject) => {
        try {
            return accessWriteStream.write(log + '\n', resolve);
        } catch (err) {
            reject(err);
        }
    });
};

export const analyseLog = (fileName: string): Promise<number> => {
    const fullName: string = getFullFileName(fileName);
    let chromeNum: number = 0;
    let sum: number = 0;
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(fullName);
        const rl = readLine.createInterface({input: readStream});
        rl.on('line', (line: string) => {
            if (!line) {
                return;
            }
            sum++;
            if (line.split(' -- ')[2].match(/chrome/i)) {
                chromeNum++;
            }
        });
        rl.on('close', () => {
            resolve(chromeNum / sum);
        });
        rl.on('error', (err: Error) => {
            reject(err);
        });
    });
};
