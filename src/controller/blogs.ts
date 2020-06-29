import {sql} from '../db/index';
const {escape} = require('mysql');

export const getList = async ({author, keyword}: ListRequestParams): Promise<SqlCheckResult> => {
    let sqlText: string = 'select id, title, content, createtime, author from blogs where 1=1';
    if (author) {
        author = escape(author);
        sqlText += ` and author=${author}`;
    }
    if (keyword) {
        keyword = escape('%' + keyword + '%');
        sqlText += ` and title like ${keyword}`;
    }
    sqlText += ' order by createtime desc;';
    return await sql(sqlText);
};

export const getDetail = async (id: number): Promise<SqlCheckResult> => {
    const sqlText: string = `select id, title, content, createtime from blogs where id=${id};`;
    return await sql(sqlText);
};

export const updateBlog = async (id: number, content: any): Promise<SqlUpdateResult> => {
    content = escape(content);
    const sqlText: string = `update blogs set content=${content} where id=${id};`;
    return await sql(sqlText);
};

export const deleteBlog = async (id: number): Promise<SqlDeleteResult> => {
    const sqlText: string = `delete from blogs where id=${id};`;
    return await sql(sqlText);
};

export const createBlog = async ({
    title,
    content,
    author,
    createTime
}: Blog): Promise<SqlInsertResult> => {
    author = escape(author);
    title = escape(title);
    content = escape(content);
    createTime = escape(createTime);
    const sqlText: string = `insert into blogs(title, content, author, createTime, state) values(${title}, ${content}, ${author}, ${createTime}, 1);`;
    return await sql(sqlText);
};
