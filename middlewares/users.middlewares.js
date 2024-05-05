"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = exports.refreshTokenValidator = exports.accessTokenValidator = exports.regitsterValidator = exports.loginValidator = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const database_services_1 = require("../services/database.services");
const cryto_1 = require("../utils/cryto");
const jwt_1 = require("../utils/jwt");
dotenv_1.default.config(); //file nào sử dụng process.env thì phải sử dụng hàm config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const usersService = database_services_1.databaseService.users;
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
exports.loginValidator = (0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_1.USERS_MESSAGE.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const user = await usersService.findOne({ email: value, password: (0, cryto_1.hashPassword)(req.body.password) });
                if (user === null) {
                    throw new Error(messages_1.USERS_MESSAGE.EMAIL_OR_PASSWORD_INCORECT);
                }
                req.user = user;
                return true;
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.PASSWORD_IS_REQUIRED
        },
        isStrongPassword: {
            errorMessage: messages_1.USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
    }
}, ['body']);
// tham số thứ 2 của checkSchema là để xác định vùng kiểm tra schema
// nếu không truyền vào thì sẽ kiểm tra 'body' | 'cookies' | 'headers' | 'params' | 'query'
// từ đó làm ảnh hưởng tới hiệu suất nên chúng ta chỉ check trong body gửi lên là đủ
exports.regitsterValidator = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.NAME_IS_REQUIRED
        },
        isString: {
            errorMessage: messages_1.USERS_MESSAGE.NAME_MUST_BE_A_STRING
        },
        isLength: {
            options: {
                min: 1,
                max: 50
            },
            errorMessage: messages_1.USERS_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        },
        trim: true
    },
    email: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.EMAIL_IS_REQUIRED
        },
        isEmail: {
            errorMessage: messages_1.USERS_MESSAGE.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value) => {
                const existingEmail = await usersService.findOne({ email: value });
                if (existingEmail !== null) {
                    throw new Error(messages_1.USERS_MESSAGE.EMAIL_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.PASSWORD_IS_REQUIRED
        },
        isStrongPassword: {
            errorMessage: messages_1.USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
    },
    confirm_password: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.COMFIRM_PASSWORD_IS_REQUIRED
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(messages_1.USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD);
                }
                return true;
            }
        }
    }
}, ['body']);
exports.accessTokenValidator = (0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (values, { req }) => {
                const access_token = values.split(' ')[1];
                if (access_token === '') {
                    throw new Errors_1.ErrorWithStatus({
                        message: messages_1.USERS_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
                        status: httpStatus_1.default.UNAUTHORIED
                    });
                }
                const decoded_authorizarion = await (0, jwt_1.verifyToken)({ token: access_token, secretOrPublickey: accessTokenSecret });
                if (decoded_authorizarion === null) {
                    throw new Error(messages_1.USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID);
                }
                req.decoded_authorizarion = decoded_authorizarion;
                return true;
            }
        }
    }
}, ['headers']);
exports.refreshTokenValidator = (0, express_validator_1.checkSchema)({
    refresh_token: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
        },
        custom: {
            options: async (value, { req }) => {
                try {
                    const [refreshToken] = await Promise.all([
                        database_services_1.databaseService.refreshToken.findOne({ token: value }),
                        (0, jwt_1.verifyToken)({ token: value, secretOrPublickey: refreshTokenSecret })
                    ]);
                    if (refreshToken === null) {
                        throw new Error(messages_1.USERS_MESSAGE.REFRESH_TOKEN_IS_NOT_EXIST);
                    }
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                        throw new Errors_1.ErrorWithStatus({
                            message: messages_1.USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID,
                            status: httpStatus_1.default.UNAUTHORIED
                        });
                    }
                    throw error;
                }
                return true;
            }
        }
    }
}, ['body']);
exports.emailValidator = (0, express_validator_1.checkSchema)({
    email: {
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const user = await usersService.findOne({ email: value });
                if (user === null) {
                    throw new Error(messages_1.USERS_MESSAGE.EMAIL_OR_PASSWORD_INCORECT);
                }
                req.user = user;
                return true;
            }
        }
    }
}, ['body']);
// kiểm tra xem schema truyền vào có phù hợp hay không
