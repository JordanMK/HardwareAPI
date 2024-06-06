"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMComponents = void 0;
const express_1 = __importDefault(require("express"));
const RAMController_1 = __importDefault(require("../../../../controllers/components/RAMController"));
const auth_1 = __importDefault(require("../../../../middleware/auth"));
const verifyRole_1 = __importDefault(require("../../../../middleware/verifyRole"));
const models_1 = require("../../../../types/models");
const router = express_1.default.Router();
router
    .route('/:id')
    .get(RAMController_1.default.getRAMComponentById)
    .patch(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), RAMController_1.default.updateRAMComponent)
    .delete(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN), RAMController_1.default.deleteRAMComponent);
router
    .route('/')
    .get(RAMController_1.default.getRAMComponents)
    .post(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), RAMController_1.default.createRAMComponent);
exports.RAMComponents = router;
