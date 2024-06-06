"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../types/models");
const Device_1 = __importDefault(require("./Device"));
const Computer = new mongoose_1.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    computerType: {
        type: String,
        enum: Object.values(models_1.ComponentType),
        required: true,
    },
    images: { type: [String] },
    cpu: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: models_1.ComponentType.CPU,
    },
    gpu: { type: mongoose_1.Schema.Types.ObjectId, ref: models_1.ComponentType.GPU },
    ram: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: models_1.ComponentType.RAM,
    },
    ramModules: { type: Number, required: true },
    ramCapacity: { type: Number, required: true },
});
exports.default = Device_1.default.discriminator(models_1.DeviceType.COMPUTER, Computer);
