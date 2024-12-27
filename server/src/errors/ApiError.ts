export class ApiError extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string): ApiError {
        return new ApiError(400, message);
    }

    static internal(message: string): ApiError {
        return new ApiError(500, message);
    }

    static forbidden(message: string): ApiError {
        return new ApiError(403, message);
    }
}
