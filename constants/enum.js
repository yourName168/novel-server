"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = exports.UserVerifyStatus = void 0;
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus[UserVerifyStatus["Unverified"] = 0] = "Unverified";
    UserVerifyStatus[UserVerifyStatus["verified"] = 1] = "verified";
    UserVerifyStatus[UserVerifyStatus["Banned"] = 2] = "Banned";
})(UserVerifyStatus || (exports.UserVerifyStatus = UserVerifyStatus = {}));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["AccessToken"] = 0] = "AccessToken";
    TokenType[TokenType["RefreshToken"] = 1] = "RefreshToken";
    TokenType[TokenType["ForgotPasswordToken"] = 2] = "ForgotPasswordToken";
    TokenType[TokenType["EmailVerifyToken"] = 3] = "EmailVerifyToken";
})(TokenType || (exports.TokenType = TokenType = {}));
