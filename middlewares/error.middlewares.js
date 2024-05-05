"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const defaultErrorHandler = (err, req, res, next) => {
    res.status(err.status || 501).send({ err } || 'Server Error');
};
exports.defaultErrorHandler = defaultErrorHandler;
