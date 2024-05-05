"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFollowNovelController = exports.followNovelController = exports.getMeController = exports.logoutController = exports.regitsterController = exports.loginController = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Novels_Services_1 = require("../services/Novels.Services");
const Users_Services_1 = __importDefault(require("../services/Users.Services"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
const loginController = async (req, res, next) => {
    const user = req.user;
    const result = await Users_Services_1.default.login(user);
    return res.status(httpStatus_1.default.APPECTED).json({
        message: 'login success!',
        result
    });
};
exports.loginController = loginController;
const regitsterController = async (req, 
//RegitsterRequestBody dùng để gán kiểu cho body gửi lên từ request Regitster
res, next) => {
    // câu lệnh giúp giả định lỗi để luồng chạy xuống khối catch
    const result = await Users_Services_1.default.regitster(req.body);
    // truyền vào hàm regitster một object do hàm regitster nhận vào payload
    // là object gồm email và password
    return res.status(httpStatus_1.default.CREATED).json({
        message: 'register success!',
        result
    });
};
exports.regitsterController = regitsterController;
const logoutController = async (req, res, next) => {
    const { refresh_token } = req.body;
    const result = await Users_Services_1.default.logout(refresh_token);
    return res.json(result);
};
exports.logoutController = logoutController;
const getMeController = async (req, res, next) => {
    const { user_id } = req.decoded_authorizarion;
    const result = await Users_Services_1.default.getMe(user_id);
    return res.json(result);
};
exports.getMeController = getMeController;
const followNovelController = async (req, res, next) => {
    const { user_id } = req.decoded_authorizarion;
    const { novelId } = req.body;
    await Users_Services_1.default.followNovel(user_id, novelId);
    const result = await Novels_Services_1.NovelService.increaseFollow(novelId);
    return res.json(result);
};
exports.followNovelController = followNovelController;
const unFollowNovelController = async (req, res, next) => {
    const { user_id } = req.decoded_authorizarion;
    const { novelId } = req.body;
    await Users_Services_1.default.unFollowNovel(user_id, novelId);
    const result = await Novels_Services_1.NovelService.decreaseFollow(novelId);
    return res.json(result);
};
exports.unFollowNovelController = unFollowNovelController;
