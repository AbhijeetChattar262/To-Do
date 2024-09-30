
export class CustomError extends Error {
    code: number;
    constructor(message: string = "Something went wrong", code: number) {
        super(message);
        this.code = code;
    }
}