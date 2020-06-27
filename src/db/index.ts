const mysql = require('mysql');
const redis = require('redis');
import {REDIS_EXPIRES} from '../conf/common';
import _ from 'lodash';
import {mysqlConfig, redisConfig} from '../conf/db';

// 连接mysql
const connection = mysql.createConnection(mysqlConfig);

connection.connect();

export const sql = function(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err: Error, rows: any, fields: any): void {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// 连接redis
const client = redis.createClient(redisConfig);
client.on('error', function(error: Error) {
    console.error(error);
});

export const redisSet = (key: string, value: Object | string, callback?: Function) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    client.set(key, value, redis.print);
    client.expire(key, REDIS_EXPIRES); //设置过期时间
    if (typeof callback === 'function') {
        callback(key, value);
    }
};

export const redisGet = (key: string | number): any => {
    return new Promise((resolve, reject) => {
        client.get(key, (err: Error | undefined, value: string) => {
            if (err) {
                reject(err);
            }
            if (_.isNil(value)) {
                resolve(value);
            }
            try {
                resolve(JSON.parse(value));
            } catch (err) {
                resolve(value);
            }
        });
    });
};

export const redisDel = (keys: string | number | Array<string | number>): void => {
    if (Array.isArray(keys)) {
        keys.forEach(key => client.del(key));
    } else {
        client.del(keys);
    }
};

export const redisExists = (key: string | number): boolean => {
    return client.Exists(key);
};
