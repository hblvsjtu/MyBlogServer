/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

import {BASE_DIR, DEFAULT_FILE} from './utils/common';
const pexpress = require('tspexpress');

const server: PExpress = pexpress.create();
server.setStaticPath(BASE_DIR, {defaultFile: DEFAULT_FILE});
server.get('/get/:path', ({req, res}: Next): Next | Promise<Next> => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('path is get/path, and routerQuery = ' + JSON.stringify(req.routeQuery));
    return {req, res};
});
server.listen(3000, () => console.log(`server has started, have fun!`));
