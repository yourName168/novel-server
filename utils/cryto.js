"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const node_crypto_1 = require("node:crypto");
function hashPassword(content) {
    return (0, node_crypto_1.createHash)('sha3-256')
        .update(content + process.env.PASSWORD_SECRET)
        .digest('hex');
}
exports.hashPassword = hashPassword;
