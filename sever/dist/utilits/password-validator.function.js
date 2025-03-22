"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
const passwordValidator = (str) => {
    if (!str)
        return false;
    const regexp = /(?=.*[a-z])(?=.*[A-Z]){6,}/g;
    return regexp.test(str);
};
exports.passwordValidator = passwordValidator;
