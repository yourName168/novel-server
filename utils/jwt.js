"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = async ({ payload, privateKey, options = { algorithm: 'HS256' } }) => {
    return await new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, 
        //payload chứa thông tin của người dùng
        privateKey, 
        // privateKey chứa khóa bảo mật để tạo jwt lưu trong db
        options, 
        // options là thuật toán sử dụng mã hóa
        (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = ({ token, secretOrPublickey }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secretOrPublickey, (error, decoded) => {
            if (error) {
                throw reject(error);
            }
            return resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
