/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

import {BASE_DIR, DEFAULT_FILE} from './utils/common';
import getList from './controller/getList';
import getDetail from './controller/getDetail';
import {readFile} from './utils/io';
import {MODEL_DATA_DIR} from '../src/utils/common';
import {SuccessModel, FailModel} from './model/resModel';
import {updateBlog} from './controller/update';
import {isLogin, isCreateProfile} from './controller/user';
const path = require('path');
const pexpress = require('tspexpress');

const server: PExpress = pexpress.create();
server.setStaticPath(BASE_DIR, {defaultFile: DEFAULT_FILE});

// 设定默认的返回格式
server.use((next: Next): Next | Promise<Next> => {
    next.res.writeHead(200, {'Content-Type': 'application/json'});
    return next;
});

// 获取博客列表
server.get('/api/blog/list', ({req, res}: Next): Next | Promise<Next> => {
    const listQuery: ListRequestParams = req.query || {};
    try {
        const list: List = getList(listQuery);
        const result: SuccessModel = new SuccessModel(list);
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
    }
    return {req, res};
});

// 获取博客详情
server.get('/api/blog/detail', ({req, res}: Next): Next | Promise<Next> => {
    const detailQuery: DetailRequestParams = req.query || {};
    try {
        const list: List = getDetail(detailQuery);
        const result: SuccessModel = new SuccessModel(list);
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
    }
    return {req, res};
});

// 新建博客
server.post(
    '/api/blog/new',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const data: Array<FileData> = await readFile(path.join(MODEL_DATA_DIR, 'a1.json'));
            const result: SuccessModel = new SuccessModel(data);
            res.end(JSON.stringify(result));
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 更新博客
server.post(
    '/api/blog/update',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const {id, content} = req.body;
            if (!id) {
                throw new Error('id is not found!');
            }
            const blog: Blog = updateBlog(id, content);
            const result: SuccessModel = new SuccessModel(blog);
            res.end(JSON.stringify(result));
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 删除博客
server.post(
    '/api/blog/delete',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const {id} = req.body;
            if (!id) {
                throw new Error('id is not found!');
            }
            const result: SuccessModel = new SuccessModel({id});
            res.end(JSON.stringify(result));
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 登陆博客
server.post(
    '/api/user/login',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const {userName, password} = req.body;
            if (!userName || !password) {
                throw new Error('user information is not found!');
            }
            if (await isLogin(userName, password)) {
                const result: SuccessModel = new SuccessModel({data: '登陆成功！'});
                res.end(JSON.stringify(result));
            } else {
                throw new Error('登陆失败！');
            }
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 新建账号
server.post(
    '/api/user/create',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const {userName, password} = req.body;
            if (!userName || !password) {
                throw new Error('user information is not found!');
            }
            if (await isCreateProfile(userName, password)) {
                const result: SuccessModel = new SuccessModel({data: '创建成功！'});
                res.end(JSON.stringify(result));
            } else {
                throw new Error('创建失败！');
            }
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

server.listen(3000, () => console.log(`server has started, have fun!`));
