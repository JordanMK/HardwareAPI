"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computers = void 0;
const express_1 = __importDefault(require("express"));
const RAMController_1 = __importDefault(require("../../../../controllers/components/RAMController"));
const auth_1 = __importDefault(require("../../../../middleware/auth"));
const verifyRole_1 = __importDefault(require("../../../../middleware/verifyRole"));
const models_1 = require("../../../../types/models");
const ComputerController_1 = __importDefault(require("../../../../controllers/devices/ComputerController"));
const router = express_1.default.Router();
router
    .route('/:id')
    // 	.get(RAMController.getRAMComponentById)
    // 	.patch(
    // 		auth,
    // 		verifyRole(UserRole.ADMIN, UserRole.USER),
    // 		RAMController.updateRAMComponent
    // 	)
    .delete(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN), RAMController_1.default.deleteRAMComponent);
router
    .route('/')
    .get(ComputerController_1.default.getComputers)
    .post(auth_1.default, (0, verifyRole_1.default)(models_1.UserRole.ADMIN, models_1.UserRole.USER), ComputerController_1.default.createComputer);
exports.computers = router;
