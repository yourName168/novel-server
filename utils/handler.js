"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
const wrap = (func) => {
    // nhận vào một function để thực hiện try catch
    return async (req, res, next) => {
        try {
            // nếu thành công thì trả về một req handler trong hàm route
            await func(req, res, next);
        }
        catch (error) {
            // nếu dính lỗi thì chuyển sang error handler để xử lý lối
            next(error);
        }
    };
};
exports.wrap = wrap;
