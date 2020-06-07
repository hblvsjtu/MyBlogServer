/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

const http = require('http');
const queryString = require('querystring');
import buildStatisFiles from '../src/utils/staticPath';
import {BASEDIR} from './utils/common';

const server = http.createServer((req: any, res: any): void => {
    const url = req.url;
    const [relativePath, queryObject] = url.split('?');
    const query = queryString.parse(queryObject);
    const ext = relativePath.split('.').reverse()[0];
    console.log('query = ', query, url, BASEDIR, relativePath, BASEDIR + relativePath, ext);
    if (url !== '/' && ext) {
        buildStatisFiles({
            res,
            path: BASEDIR + relativePath,
            contentType: 'text/' + ext
        });
    } else {
        res.end(JSON.stringify(query));
    }
});

server.listen('3000');
