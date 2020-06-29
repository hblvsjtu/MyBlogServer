/**
 * @file axios入口
 * @author lvhongbin(lvhongbin@baidu.com)
 */

import {SuccessModel, FailModel} from '../model/resModel';
import {login, createProfile} from '../controller/user';
import setCookie from '../utils/cookie';
import {getExpiresTime} from '../utils/time';
import get from 'lodash/get';
import {redisSet, redisGet, redisDel} from '../db/index';
import {writeErrorLog} from '../utils/io';

// 登陆博客
export const loginRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userName = '', password = ''} = req.body || {};
        if (!userName || !password) {
            throw new Error('user information is not found!');
        }
        const loginResult: List = await login(userName, password);
        const userId = get(loginResult, '[0].id');
        if (userId) {
            let token: string = await redisGet(userId);
            if (!token) {
                token = userId + '_' + Date.now();
                redisSet(userId, token);
            }
            setCookie(
                {
                    userId: {
                        value: userId,
                        expires: getExpiresTime(1 * 60 * 60 * 1000)
                    },
                    token: {
                        value: token,
                        expires: getExpiresTime(1 * 60 * 60 * 1000)
                    }
                },
                res
            );
            req.session = {
                ...loginResult,
                token
            };
            redisSet(token, req.session);
            const result: SuccessModel = new SuccessModel({userId, token});
            res.end(JSON.stringify(result));
        } else {
            throw new Error('登陆失败！');
        }
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url} = req;
        writeErrorLog(`${Date.now()} -- ${method} -- ${url} -- ${err.message}`);
    }
    return {req, res};
};

// 退出博客
export const logoutRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userId, token} = req.body;
        if (!userId || !token) {
            throw new Error('user information is not found!');
        }
        redisDel([userId, token]);
        const result: SuccessModel = new SuccessModel({data: '登出成功！'});
        res.end(JSON.stringify(result));
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url} = req;
        writeErrorLog(`${Date.now()} -- ${method} -- ${url} -- ${err.message}`);
    }
    return {req, res};
};

// 新建账号
export const createProfileRouter = async ({req, res}: Next): Promise<Next> => {
    try {
        const {userName, password} = req.body;
        if (!userName || !password) {
            throw new Error('user information is not found!');
        }
        const createResult = await createProfile(userName, password);
        if (createResult.insertId) {
            const result: SuccessModel = new SuccessModel({data: '创建成功！'});
            res.end(JSON.stringify(result));
        } else {
            throw new Error('创建失败！');
        }
    } catch (err) {
        const result: FailModel = new FailModel(err.message);
        res.end(JSON.stringify(result));
        const {method, url} = req;
        writeErrorLog(`${Date.now()} -- ${method} -- ${url} -- ${err.message}`);
    }
    return {req, res};
};
