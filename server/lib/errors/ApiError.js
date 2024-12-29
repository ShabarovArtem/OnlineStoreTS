export default class ApiError extends Error {
    status;
    msg;
    constructor(status, msg) {
        super(msg);
        this.status = status;
        this.msg = msg;
    }
    static BadRequest(msg) {
        return new ApiError(400, msg);
    }
    static Forbidden(msg) {
        return new ApiError(403, msg);
    }
    static NotFound(msg) {
        return new ApiError(404, msg);
    }
    static Conflict(msg) {
        return new ApiError(409, msg);
    }
}
