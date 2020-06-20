const mysql = require('mysql');
import mysqlConnnectConfig from '../conf/db';

const connection = mysql.createConnection(mysqlConnnectConfig);

connection.connect();

const sql = function(sql: string): Promise<any> {
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

export default sql;
