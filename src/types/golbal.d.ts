interface ListRequestParams {
    authod?: string;
    keyword?: string;
}

interface DetailRequestParams {
    authod?: string;
    keyword?: string;
}

interface Blog {
    id: number;
    title: string;
    content: any;
    creatTime: string;
    authod: string;
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
