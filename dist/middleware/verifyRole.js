"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.role)) {
            return res.status(401).json({ message: '' });
        }
        const roles = [...allowedRoles];
        const result = roles.includes(req.role);
        if (!result) {
            return res.status(403).json({
                message: 'You do not have permissions to access this resource',
            });
        }
        next();
    };
};
exports.default = verifyRole;
