/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req: any, res: any): void => {
    const url = req.url;
    const query = queryString.parse(url.split('?')[1]);
    console.log('query = ', query);
    res.end(JSON.stringify(query));
});

server.listen('3000');
