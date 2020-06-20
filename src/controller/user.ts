import sql from '../db/index';
import get from 'lodash/get';

export const isLogin = async function(userName: string, password: string) {
    try {
        const sqlText = `select id from users where username='${userName}' and password='${password}'`;
        const result = await sql(sqlText);
        return !!get(result, '[0].id');
    } catch (err) {
        throw err;
    }
};

export const isCreateProfile = async function(userName: string, password: string) {
    try {
        const sqlText = `insert into users(username, \`password\`, realname, state) values('${userName}', '${password}', '${userName}', 1);`;
        const result = await sql(sqlText);
        return !!result.insertId;
    } catch (err) {
        throw err;
    }
};
