export interface ICustomError {
    error: Error,
    statusCode: number,
    data: any
}

export default class CustomError {
    statusCode: number;
    error: Error;
    data: any;
    constructor(obj: ICustomError) {
        this.statusCode = obj.statusCode;
        this.error = obj.error;
        this.data = obj.data;
    }
}