"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../types/models");
const Component_1 = __importDefault(require("./Component"));
const CPU = new mongoose_1.Schema({
    family: { type: String, required: true },
    series: { type: String, required: true },
    generation: { type: String, required: true },
    architecture: { type: String, required: true },
    cores: { type: Number, required: true },
    threads: { type: Number, required: true },
    baseClock: { type: Number, required: true },
    boostClock: { type: Number, required: true },
    tdp: { type: Number, required: true },
    socket: { type: String, required: true },
    technology: { type: Number, required: true },
    integratedGraphics: {
        name: {
            type: String,
            required: function () {
                return this.integratedGraphics;
            },
        },
        brand: {
            type: String,
            required: function () {
                return this.integratedGraphics;
            },
        },
        generation: {
            type: String,
            required: function () {
                return this.integratedGraphics;
            },
        },
        architecture: {
            type: String,
            required: function () {
                return this.integratedGraphics;
            },
        },
        baseClock: {
            type: Number,
            required: function () {
                return this.integratedGraphics;
            },
        },
        boostClock: {
            type: Number,
            required: function () {
                return this.integratedGraphics;
            },
        },
    },
    cache: {
        l1: { type: String, required: true },
        l2: { type: String, required: true },
        l3: { type: String, required: true },
    },
    hyperthreading: { type: Boolean, required: true },
    pcieSupport: { type: String, required: true },
    maxPcieLanes: { type: Number, required: true },
    virtualisationSupport: { type: Boolean, required: true },
});
exports.default = Component_1.default.discriminator(models_1.ComponentType.CPU, CPU);
