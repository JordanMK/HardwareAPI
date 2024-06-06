"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../types/models");
const Component_1 = __importDefault(require("./Component"));
const RAM = new mongoose_1.Schema({
    series: { type: String, required: true },
    memoryType: { type: String, required: true },
    formFactor: { type: String, required: true },
    eccSupport: { type: Boolean, required: true },
    baseClock: { type: Number, required: true },
    memorySpeed: { type: Number, required: true },
    casLatency: { type: String, required: true },
    voltage: { type: Number, required: true },
});
exports.default = Component_1.default.discriminator(models_1.ComponentType.RAM, RAM);
