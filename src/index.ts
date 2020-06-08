/**
 * @file server入口
 * @author hblvsjtu(hblvsjtu@163.com)
 */

const http = require('http');
const queryString = require('querystring');
import buildStatisFiles from '../src/utils/staticPath';
import {BASE_DIR, DEFAULT_FILE} from './utils/common';

const server = http.createServer((req: any, res: any): void => {
    const url = req.url;
    const [relativePath, queryObject] = url.split('?');
    const query = queryString.parse(queryObject);
    const ext = relativePath.split('.').reverse()[0];
    console.log('query = ', query, url, BASE_DIR, relativePath, BASE_DIR + relativePath, ext);
    if (url === '/') {
        buildStatisFiles({
            res,
            path: BASE_DIR + '/' + DEFAULT_FILE,
            contentType: 'text/' + DEFAULT_FILE.split('.')[1]
        });
    } else if (ext) {
        buildStatisFiles({
            res,
            path: BASE_DIR + relativePath,
            contentType: 'text/' + ext
        });
    } else {
        res.end(JSON.stringify(query));
    }
});

server.listen('3000');
