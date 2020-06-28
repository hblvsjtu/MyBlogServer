/// <reference path="../src/types/golbal.d.ts"/>

import {sum} from '../src/utils/index';
import {readFile, analyseLog} from '../src/utils/io';
const path = require('path');
const filrDir = path.resolve(__dirname, '../debug');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('read File a/b/c', async (): Promise<any> => {
    const data: Array<FileData> = await readFile(path.join(filrDir, 'a.json'));
    expect(data).toEqual([
        {next: 'b.json', message: 'this is a.json'},
        {next: 'c.json', message: 'this is b.json'},
        {next: null, message: 'this is c.json'}
    ]);
});

test('read File d', async (): Promise<any> => {
    const data: Array<FileData> = await readFile(path.join(filrDir, 'd.json'));
    expect(data).toEqual([{next: null, message: 'this is d.json'}]);
});

analyseLog('access.log').then(data => console.log('chrome 的占比：', data));
