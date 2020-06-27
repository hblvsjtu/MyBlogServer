/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

import {BASE_DIR, DEFAULT_FILE} from './conf/common';
const pexpress = require('tspexpress');
import {
    getBlogDetailRouter,
    getBlogListRouter,
    createBlogRouter,
    deleteBlogRouter,
    updateBlogRouter
} from './router/blogs';
import {createProfileRouter, loginRouter, logoutRouter} from './router/user';
import {PORT} from './conf/common';

const server: PExpress = pexpress.create();
// server.setStaticPath(BASE_DIR, {defaultFile: DEFAULT_FILE});

// 设定默认的返回格式
server.use((next: Next): Next | Promise<Next> => {
    next.res.setHeader('Content-Type', 'application/json;charset=utf-8');
    next.res.statusCode = 200;
    next.res.statusMessage = 'request success!';
    return next;
});

// 获取博客列表
server.get('/api/blog/list', getBlogListRouter);

// 获取博客详情
server.get('/api/blog/detail', getBlogDetailRouter);

// 新建博客
server.post('/api/blog/new', createBlogRouter);

// 更新博客
server.post('/api/blog/update', updateBlogRouter);

// 删除博客
server.post('/api/blog/delete', deleteBlogRouter);

// 登陆博客
server.post('/api/user/login', loginRouter);

// 登出博客
server.post('/api/user/logout', logoutRouter);

// 新建账号
server.post('/api/user/create', createProfileRouter);

server.listen(PORT, () => console.log(`server has started, have fun!`));
