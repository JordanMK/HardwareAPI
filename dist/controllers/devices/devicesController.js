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
const Device_1 = __importDefault(require("../../models/devices/Device"));
const models_1 = require("../../types/models");
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const queryController_1 = require("../queryController");
const getDeviceTypes = (req, res) => {
    res.status(200).json(Object.values(models_1.DeviceType));
};
const getDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const tranformedQuery = (0, queryController_1.transformDotNotation)(query);
    const { error } = validateDeviceQuery(tranformedQuery);
    if (error) {
        res.status(400).json({ message: 'Invalid query' });
        return;
    }
    try {
        const devices = yield Device_1.default.find(query)
            .populate('cpu')
            .populate('gpu')
            .populate('ram');
        res.status(200).json(devices);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const device = yield Device_1.default.findById(req.params.id);
        if (!device) {
            res.status(404).json({ message: 'Device not found' });
            return;
        }
        res.status(200).json(device);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const deleted = yield Device_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Device not found' });
            return;
        }
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const validateDeviceQuery = (query) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string(),
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        deviceType: joi_1.default.string(),
        images: joi_1.default.array().items(joi_1.default.string()),
    });
    return schema.validate(query);
};
exports.default = {
    getDevices,
    getDeviceById,
    deleteDevice,
    getDeviceTypes,
};
