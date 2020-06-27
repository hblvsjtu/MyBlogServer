const env: string | undefined = process.env.NODE_ENV;

let mysqlConnnectConfig: MysqlConnnectConfig;
let redisConnnectConfig: RedisConnnectConfig;

if (env === 'production') {
    mysqlConnnectConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345687abC',
        port: '3306',
        database: 'blog'
    };
    redisConnnectConfig = {
        host: '127.0.0.1',
        port: '6379'
    };
} else {
    mysqlConnnectConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345687abC',
        port: '3306',
        database: 'blog'
    };
    redisConnnectConfig = {
        host: '127.0.0.1',
        port: '6379'
    };
}

export const mysqlConfig = mysqlConnnectConfig;
export const redisConfig = redisConnnectConfig;
