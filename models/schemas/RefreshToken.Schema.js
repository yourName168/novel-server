"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RefreshTokens {
    constructor({ _id, token, created_at = new Date(), user_id }) {
        this.token = token;
        this._id = _id;
        this.created_at = created_at || new Date().toISOString();
        this.user_id = user_id;
    }
}
exports.default = RefreshTokens;
