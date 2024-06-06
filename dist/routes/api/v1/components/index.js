"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
const express_1 = __importDefault(require("express"));
const componentsController_1 = __importDefault(require("../../../../controllers/components/componentsController"));
const cpu_1 = require("./cpu");
const gpu_1 = require("./gpu");
const ram_1 = require("./ram");
const router = express_1.default.Router();
router.use('/cpu', cpu_1.CPUComponents);
router.use('/gpu', gpu_1.GPUComponents);
router.use('/ram', ram_1.RAMComponents);
router.route('/componentTypes').get(componentsController_1.default.getComponentTypes);
router.route('/:id').get(componentsController_1.default.getComponentById);
router.route('/').get(componentsController_1.default.getComponents);
exports.components = router;
