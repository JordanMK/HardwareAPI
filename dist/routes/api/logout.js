"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const router = express_1.default.Router();
router.route('/').get(userController_1.default.logoutUser);
exports.logout = router;
