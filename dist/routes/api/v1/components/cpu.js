"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPUComponents = void 0;
const express_1 = __importDefault(require("express"));
const CPUController_1 = __importDefault(require("../../../../controllers/components/CPUController"));
const auth_1 = __importDefault(require("../../../../middleware/auth"));
const verifyRole_1 = __importDefault(require("../../../../middleware/verifyRole"));
const models_1 = require("../../../../types/models");
const router = express_1.default.Router();
router
    .route('/:id')
    .get(CPUController_1.default.getCPUComponentById)
    .patch(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), CPUController_1.default.updateCPUComponent)
    .delete(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN), CPUController_1.default.deleteCPUComponent);
router
    .route('/')
    .get(CPUController_1.default.getCPUComponents)
    .post(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), CPUController_1.default.createCPUComponent);
exports.CPUComponents = router;
