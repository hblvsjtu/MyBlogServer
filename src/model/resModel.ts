class BaseModel {
    data: any;
    message: any;
    constructor(data: any, message?: any) {
        if (typeof data === 'string') {
            this.message = data;
            message = null;
            data = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

export class SuccessModel extends BaseModel {
    code: number;
    constructor(data: any, message?: any) {
        super(data, message);
        this.code = 0;
    }
}

export class FailModel extends BaseModel {
    code: number;
    constructor(data: any, message?: any) {
        super(data, message);
        this.code = -1;
    }
}
