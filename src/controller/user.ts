import {sql} from '../db/index';

export const login = async function(userName: string, password: string): Promise<List> {
    try {
        const sqlText = `select id from users where username='${userName}' and password='${password}'`;
        return await sql(sqlText);
    } catch (err) {
        throw err;
    }
};

export const createProfile = async function(
    userName: string,
    password: string
): Promise<SqlInsertResult> {
    try {
        const isExistSameUsername = !!(
            await sql(`select id from users where username='${userName}'`)
        ).length;
        if (isExistSameUsername) {
            throw new Error('账户名已存在，请登陆或者另起账户名！');
        }
        const sqlText = `insert into users(username, \`password\`, realname, state) values('${userName}', '${password}', '${userName}', 1);`;
        return await sql(sqlText);
    } catch (err) {
        throw err;
    }
};
