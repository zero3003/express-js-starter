import { Result, ValidationError } from "express-validator";

class CustomValidationError extends Error {
    errorMessages: string[];

    constructor(error: Result<ValidationError>) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.errorMessages = error.array().map((e) => e.msg) || [];
    }
}

export default CustomValidationError