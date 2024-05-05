"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class User {
    constructor(user) {
        this._id = user._id || new mongodb_1.ObjectId();
        this.name = user.name || ' ';
        this.email = user.email;
        this.username = user.username || '';
        this.password = user.password;
        this.created_at = user.created_at || new Date();
        this.updated_at = user.updated_at || new Date();
        this.following = [];
    }
}
exports.default = User;
