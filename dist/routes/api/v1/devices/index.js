"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devices = void 0;
const express_1 = __importDefault(require("express"));
const computers_1 = require("./computers");
const devicesController_1 = __importDefault(require("../../../../controllers/devices/devicesController"));
const router = express_1.default.Router();
router.use('/computers', computers_1.computers);
router.route('/deviceTypes').get(devicesController_1.default.getDeviceTypes);
router.route('/:id').get(devicesController_1.default.getDeviceById);
router.route('/').get(devicesController_1.default.getDevices);
exports.devices = router;
