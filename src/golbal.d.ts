interface StaticFilesOptions {
    res: any;
    path: string;
    contentType?: string;
    responseCode?: number;
}

interface StaticFilesOptions {
    res: any;
    path: string;
    contentType?: string;
    responseCode?: number;
}

type ResolveFn<T> = (data: T) => FileData | Promise<FileData> | void;

type RejectFn = (data: Error | undefined) => any;

interface FileData {
    next: string;
    message: string;
}
