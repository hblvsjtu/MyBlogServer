const fs = require('fs');
const path = require('path');

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
