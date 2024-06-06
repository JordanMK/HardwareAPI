"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = ['http://localhost:4000', 'http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
