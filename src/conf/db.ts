const env: string | undefined = process.env.NODE_ENV;

let mysqlConnnectConfig: MysqlConnnectConfig;
if (env === 'production') {
    mysqlConnnectConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345687abC',
        port: '3306',
        database: 'blog'
    };
} else {
    mysqlConnnectConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: '12345687abC',
        port: '3306',
        database: 'blog'
    };
}

export default mysqlConnnectConfig;
