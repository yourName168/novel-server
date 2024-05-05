"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Errors_1 = require("../models/Errors");
// can be reused by many routes
// sequential processing, stops running validation chain if the previous one fails.
const validate = (validation) => {
    return async (req, res, next) => {
        // Lệnh validation.run(req) chạy chuỗi các quy
        //tắc kiểm tra dữ liệu trên yêu cầu req có trong checkSchema
        await validation.run(req);
        //validationResult(req) sẽ trả về kết quả của việc kiểm tra
        //dưới dạng một đối tượng "kết quả kiểm tra".
        const error = (0, express_validator_1.validationResult)(req);
        // giá trị lưu error object
        if (error.isEmpty()) {
            return next();
            //nếu không có lỗi thì chuyển sang controller
        }
        const errorsObject = error.mapped();
        const entityErrors = new Errors_1.EntityError({
            errors: {}
        });
        for (const key in errorsObject) {
            // lỗi không phải do validate
            const { msg } = errorsObject[key];
            errorsObject[key];
            if (msg instanceof Errors_1.ErrorWithStatus && msg.status !== httpStatus_1.default.UNPROCESSABLE_ENITY) {
                // kiểm tra msg là một ErrorWithStatus
                return next(msg);
            }
            entityErrors.errors[key] = errorsObject[key];
        }
        // kiểm tra có lỗi trong quá trình validate hay không
        next(entityErrors.errors);
    };
};
exports.validate = validate;
