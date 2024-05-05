"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const enum_1 = require("../constants/enum");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const Users_Schema_1 = __importDefault(require("../models/schemas/Users.Schema"));
const cryto_1 = require("../utils/cryto");
const jwt_1 = require("../utils/jwt");
const database_services_1 = require("./database.services");
dotenv_1.default.config(); //file nào sử dụng process.env thì phải sử dụng hàm config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const clientUrl = process.env.CLIENT_URL;
class UsersService {
    async signAccessToken(user_id) {
        //tạo ra access token
        return await (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enum_1.TokenType.AccessToken
            },
            privateKey: accessTokenSecret,
            options: {
                expiresIn: '100d'
                // đặt thời gian hết hạn
            }
        });
    }
    async regitster(payload) {
        // const result = await databaseService.users.insertOne(
        //   // do insertOne là một Promise nên để thao tác thêm dữ liệu vào DB được hoàn thành
        //   // rồi mới chuyển sang bước tiếp theo nên ta sẽ sử dụng async function
        //   new User({
        //     email,
        //     password
        //   })
        // )
        const _id = new mongodb_1.ObjectId();
        const res = await this.signAccessToken(_id.toString());
        await database_services_1.databaseService.users.insertOne(new Users_Schema_1.default({
            ...payload,
            _id,
            username: `user${_id.toString()}`,
            //được sử dụng để truyền toàn bộ các thuộc tính của đối tượng payload
            //vào trong đối tượng User khi bạn tạo một đối tượng mới.
            password: (0, cryto_1.hashPassword)(payload.password),
            // mã hóa mật khẩu bằng cryto rồi mới lưu vào db
        }));
        // send email verify
        // thêm RefreshToken vào trong database
        return res;
    }
    async login(user) {
        try {
            const user_id = user._id;
            const result = await this.signAccessToken(user_id.toString());
            return result;
        }
        catch (error) {
            throw new Errors_1.ErrorWithStatus({
                message: messages_1.USERS_MESSAGE.LOGIN_FAIL,
                status: httpStatus_1.default.UNAUTHORIED
            });
        }
    }
    async logout(refresh_token_id) {
        database_services_1.databaseService.refreshToken.deleteOne({ token: refresh_token_id });
        return {
            message: messages_1.USERS_MESSAGE.LOGOUT_SUCCESS
        };
    }
    async resetPassword(payload, _id) {
        await database_services_1.databaseService.users.updateOne({ _id: new mongodb_1.ObjectId(_id) }, {
            $set: {
                forgot_password_token: '',
                password: (0, cryto_1.hashPassword)(payload.password),
                updated_at: new Date()
            }
        });
        return {
            message: messages_1.USERS_MESSAGE.RESET_PASSWORD_SUCCESS,
            status: httpStatus_1.default.APPECTED
        };
    }
    async getMe(user_id) {
        const user = await database_services_1.databaseService.users.findOne({ _id: new mongodb_1.ObjectId(user_id) }, {
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
        return user;
    }
    async followNovel(user_id, novelId) {
        const user = await database_services_1.databaseService.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $push: { following: novelId } });
        return user;
    }
    async unFollowNovel(user_id, novelId) {
        const user = await database_services_1.databaseService.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $pull: { following: novelId } } // Sử dụng $pull để loại bỏ phần tử cụ thể từ mảng
        );
        return user;
    }
}
const usersService = new UsersService();
exports.default = usersService;
