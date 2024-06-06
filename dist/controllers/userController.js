"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../types/models");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // #swagger.tags = ['Users']
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // #swagger.tags = ['Users']
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Register']
    const reqBody = req.body;
    if (!reqBody.username || !reqBody.email || !reqBody.password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const duplicate = (yield User_1.default.findOne({
            username: reqBody.username,
        })) || (yield User_1.default.findOne({ email: reqBody.email }));
        if (duplicate) {
            res.status(409).json({ message: 'Username already exists' });
            return;
        }
        const hashedPwd = yield bcrypt_1.default.hash(reqBody.password, yield bcrypt_1.default.genSalt(10));
        const newUser = {
            username: reqBody.username,
            email: reqBody.email,
            password: hashedPwd,
            role: models_1.UserRole.USER,
        };
        const user = yield User_1.default.create(newUser);
        const showUser = {
            username: user.username,
            email: user.email,
        };
        res.status(201).json(showUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Users']
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Auth']
    const reqBody = req.body;
    if (!reqBody.username || !reqBody.email || !reqBody.password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const user = yield User_1.default.findOne({
            username: reqBody.username,
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(reqBody.password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const accesToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        const userWithToken = yield User_1.default.findByIdAndUpdate(user.id, {
            refreshToken: refreshToken,
        });
        if (!userWithToken) {
            res
                .status(500)
                .json({ message: 'An unexpected error occurred on the server.' });
            return;
        }
        res
            .status(200)
            .header('x-auth-token', accesToken)
            .cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
            .json({ success: `User ${user.username} is logged in!` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const refreshAuthUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Refresh']
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.status(401).json({ message: 'No token supplied' });
        return;
    }
    try {
        const refreshToken = cookies.jwt;
        const user = yield User_1.default.findOne({
            refreshToken: refreshToken,
        });
        if (!user) {
            res.status(403).json({ message: `No user found` });
            return;
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {}, (err, decoded) => {
            if (err || user.id !== decoded.id) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    res.status(401).json({ message: 'Used Token expired' });
                    return;
                }
                else {
                    res.status(401).json({ message: 'Authentication failed' });
                    return;
                }
            }
            const accesToken = user.generateAccessToken();
            console.log('Success');
            res
                .status(200)
                .header('x-auth-token', accesToken)
                .json({ message: 'Success' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // On client, delete the accessToken
    // #swagger.tags = ['Logout']
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.status(204).json({ message: 'No content' });
        return;
    }
    try {
        const refreshToken = cookies.jwt;
        const user = yield User_1.default.findOne({
            refreshToken: refreshToken,
        });
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true });
            res.status(204).json({ message: `No content` });
            return;
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(user.id, {
            refreshToken: '',
        });
        res.clearCookie('jwt', { httpOnly: true }); // secure: true on https
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
    authUser,
    refreshAuthUser,
    logoutUser,
};
