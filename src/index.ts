/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

import {BASE_DIR, DEFAULT_FILE, MODEL_DATA_DIR} from './utils/common';
import {readFile} from './utils/io';
import {SuccessModel, FailModel} from './model/resModel';
import {updateBlog, getList, getDetail, deleteBlog, createBlog} from './controller/blogs';
import {isLogin, isCreateProfile} from './controller/user';
const pexpress = require('tspexpress');

const server: PExpress = pexpress.create();
server.setStaticPath(BASE_DIR, {defaultFile: DEFAULT_FILE});

// 设定默认的返回格式
server.use((next: Next): Next | Promise<Next> => {
    next.res.writeHead(200, {'Content-Type': 'application/json'});
    return next;
});

// 获取博客列表
server.get(
    '/api/blog/list',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const list: SqlCheckResult = await getList(req.query as ListRequestParams);
            const result: SuccessModel = new SuccessModel(list);
            res.end(JSON.stringify(result));
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 获取博客详情
server.get(
    '/api/blog/detail',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const id: number = (req.query as Blog).id;
            const blog: Blog = (await getDetail(id))[0];
            const result: SuccessModel = new SuccessModel(blog);
            res.end(JSON.stringify(result));
        } catch (err) {
            const result: FailModel = new FailModel(err.message);
            res.end(JSON.stringify(result));
        }
        return {req, res};
    }
);

// 新建博客
server.post(
    '/api/blog/new',
    async ({req, res}: Next): Promise<Next> => {
        try {
            const blog = req.body;
            const id = (await createBlog(blog as Blog)).insertId;
            const result: SuccessModel = new SuccessModel({id});
            // const data: Array<FileData> = await readFile(path.join(MODEL_DATA_DIR, 'a1.json'));
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
            const changedRows: number = (await updateBlog(id, content)).changedRows;
            const result: SuccessModel = new SuccessModel({changedRows});
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
            const affectedRows: number = (await deleteBlog(req.body.id)).affectedRows;
            const result: SuccessModel = new SuccessModel({affectedRows});
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
