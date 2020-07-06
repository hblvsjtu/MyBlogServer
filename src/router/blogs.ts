import {SuccessModel, FailModel} from '../model/resModel';
import {updateBlog, getList, getDetail, deleteBlog, createBlog} from '../controller/blogs';
import checkProfile from './check';
import {writeErrorLog} from '../utils/io';
const {get} = require('lodash');

// 获取博客列表
export const getBlogListRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token} = req.body;
        const cookieToken = get(req, 'cookie.token');
        await checkProfile(userId, token, cookieToken);
        const list: SqlCheckResult = await getList(req.body as ListRequestParams);
        const result: SuccessModel = new SuccessModel(list);
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url, body} = req;
        writeErrorLog(
            `${Date.now()} -- ${method} -- ${url} -- ${body && body.userId} -- ${err.message}`
        );
    }
    return {req, res};
};

// 获取博客详情
export const getBlogDetailRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token, id} = req.body;
        const cookieToken = get(req, 'cookie.token');
        await checkProfile(userId, token, cookieToken);
        const blog: Blog = (await getDetail(id))[0];
        const result: SuccessModel = new SuccessModel(blog);
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url, body} = req;
        writeErrorLog(
            `${Date.now()} -- ${method} -- ${url} -- ${body && body.userId} -- ${err.message}`
        );
    }
    return {req, res};
};

// 新建博客
export const createBlogRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token} = req.body;
        const cookieToken = get(req, 'cookie.token');
        await checkProfile(userId, token, cookieToken);
        const id = (await createBlog(req.body as Blog)).insertId;
        const result: SuccessModel = new SuccessModel({id});
        // const data: Array<FileData> = await readFile(path.join(MODEL_DATA_DIR, 'a1.json'));
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url, body} = req;
        writeErrorLog(
            `${Date.now()} -- ${method} -- ${url} -- ${body && body.userId} -- ${err.message}`
        );
    }
    return {req, res};
};

// 更新博客
export const updateBlogRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token, id, content} = req.body;
        const cookieToken = get(req, 'cookie.token');
        await checkProfile(userId, token, cookieToken);
        if (!id) {
            throw new Error('id is not found!');
        }
        const changedRows: number = (await updateBlog(id, content)).changedRows;
        const result: SuccessModel = new SuccessModel({changedRows});
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url, body} = req;
        writeErrorLog(
            `${Date.now()} -- ${method} -- ${url} -- ${body && body.userId} -- ${err.message}`
        );
    }
    return {req, res};
};

// 删除博客
export const deleteBlogRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token} = req.body;
        const cookieToken = get(req, 'cookie.token');
        await checkProfile(userId, token, cookieToken);
        const affectedRows: number = (await deleteBlog(req.body.id)).affectedRows;
        const result: SuccessModel = new SuccessModel({affectedRows});
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url, body} = req;
        writeErrorLog(
            `${Date.now()} -- ${method} -- ${url} -- ${body && body.userId} -- ${err.message}`
        );
    }
    return {req, res};
};
