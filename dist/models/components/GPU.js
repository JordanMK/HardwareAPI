"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../types/models");
const Component_1 = __importDefault(require("./Component"));
const GPU = new mongoose_1.Schema({
    family: { type: String, required: true },
    series: { type: String, required: true },
    generation: { type: String, required: true },
    architecture: { type: String, required: true },
    baseClock: { type: Number, required: true },
    boostClock: { type: Number, required: true },
    vram: { type: Number, required: true },
    memoryType: { type: String, required: true },
    memorySpeed: { type: Number, required: true },
    tdp: { type: Number, required: true },
    busWidth: { type: Number, required: true },
    pcieSupport: { type: String, required: true },
    maxPcieLanes: { type: Number, required: true },
    computeCores: { type: Number, required: true },
    virtualisationSupport: { type: Boolean, required: true },
});
exports.default = Component_1.default.discriminator(models_1.ComponentType.GPU, GPU);
