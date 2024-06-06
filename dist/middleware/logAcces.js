"use strict";
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
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const logAcces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, '../logs'))) {
        yield promises_1.default.mkdir(path_1.default.join(__dirname, '../logs'));
    }
    (0, morgan_1.default)(':date[clf] | :url | :method | :status | :remote-addr | :referrer', {
        stream: fs_1.default.createWriteStream('./src/logs/access.log', { flags: 'a' }),
    })(req, res, next);
});
exports.default = logAcces;
