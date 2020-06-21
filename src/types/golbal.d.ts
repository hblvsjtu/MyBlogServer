interface ListRequestParams {
    author?: string;
    keyword?: string;
}

interface DetailRequestParams {
    author?: string;
    keyword?: string;
}

interface Blog {
    id: number;
    title: string;
    content: any;
    createTime: string;
    author: string;
}

type List = Array<Blog>;

interface FileData {
    next: string;
    message: string;
}

type FileReadPromise = <T>(absolutePath: string) => T | Promise<T>;
type ReadFile = (path: string) => Promise<Array<FileData>>;

type ResolveFileFn<T> = (data: T) => T | Promise<T> | void;

type RejectFileFn = (data?: Error) => any;

interface BaseModel {
    data: any;
    message?: any;
}

interface SuccessModel extends BaseModel {
    code: number;
}

interface FailModel extends BaseModel {
    code: number;
}

interface MysqlConnnectConfig {
    host: string;
    user: string;
    password: string;
    port: string;
    database: string;
}

interface SqlInsertResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

interface SqlUpdateResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

interface SqlDeleteResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

type SqlCheckResult = List;
