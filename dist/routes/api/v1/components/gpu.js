"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPUComponents = void 0;
const express_1 = __importDefault(require("express"));
const GPUController_1 = __importDefault(require("../../../../controllers/components/GPUController"));
const auth_1 = __importDefault(require("../../../../middleware/auth"));
const verifyRole_1 = __importDefault(require("../../../../middleware/verifyRole"));
const models_1 = require("../../../../types/models");
const router = express_1.default.Router();
router
    .route('/:id')
    .get(GPUController_1.default.getGPUComponentById)
    .patch(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), GPUController_1.default.updateGPUComponent)
    .delete(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN), GPUController_1.default.deleteGPUComponent);
router
    .route('/')
    .get(GPUController_1.default.getGPUComponents)
    .post(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), GPUController_1.default.createGPUComponent);
exports.GPUComponents = router;
