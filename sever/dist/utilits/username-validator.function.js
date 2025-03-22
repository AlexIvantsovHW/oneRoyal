"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameValidator = void 0;
const usernameValidator = (str) => {
    if (!str)
        return false;
    const regexp = /[a-z]{3,}/gi;
    return regexp.test(str);
};
exports.usernameValidator = usernameValidator;
