"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDotNotation = void 0;
const transformDotNotation = (obj) => {
    const result = {};
    Object.keys(obj).forEach((key) => {
        const keys = key.split('.');
        let currentLevel = result;
        keys.forEach((part, index) => {
            if (index === keys.length - 1) {
                currentLevel[part] = obj[key];
            }
            else {
                if (!currentLevel[part]) {
                    currentLevel[part] = {};
                }
                currentLevel = currentLevel[part];
            }
        });
    });
    return result;
};
exports.transformDotNotation = transformDotNotation;
