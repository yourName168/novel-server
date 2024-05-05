"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityError = exports.ErrorWithStatus = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
//{[key:string]:string}
class ErrorWithStatus {
    constructor({ message, status }) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
class EntityError extends ErrorWithStatus {
    constructor({ message = messages_1.USERS_MESSAGE.VALIDATION_ERROR, status = httpStatus_1.default.UNPROCESSABLE_ENITY, errors }) {
        super({ message, status });
        this.errors = errors;
    }
}
exports.EntityError = EntityError;
