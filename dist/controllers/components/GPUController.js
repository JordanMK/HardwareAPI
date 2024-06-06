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
const GPU_1 = __importDefault(require("../../models/components/GPU"));
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const queryController_1 = require("../queryController");
const getGPUComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['GPU']
    const query = Object.values(req.query).length > 0 ? req.query : req.body;
    const tranformedQuery = (0, queryController_1.transformDotNotation)(query);
    const { error } = validateGPUComponentQuery(tranformedQuery);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const gpuComponents = yield GPU_1.default.find(query);
        res.status(200).json(gpuComponents);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getGPUComponentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.values(req.query).length > 0) {
        console.log(Object.values(req.query));
        res.status(400).json({
            message: 'This route does not allow additional query parameters',
        });
        return;
    }
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const component = yield GPU_1.default.findById(req.params.id);
        if (!component) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        res.status(200).json(component);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const createGPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['GPU']
    /* #swagger.security = [{"bearerAuth": []}] */
    const body = req.body;
    const { error } = validateGPUComponent(body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const nameRegex = new RegExp(body.name, 'i');
        const duplicate = yield GPU_1.default.find({ name: nameRegex });
        if (duplicate) {
            res.status(409).json({ message: 'This component already exists' });
            return;
        }
        const gpuComponent = yield GPU_1.default.create(body);
        res.status(201).json(gpuComponent);
    }
    catch (error) {
        const errorDetails = { message: error.message, sent: req.body };
        res.status(500).json(errorDetails);
    }
});
const updateGPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['GPU']
    /* #swagger.security = [{"bearerAuth": []}] */
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    const { error } = validateGPUComponentUpdate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const gpuComponent = yield GPU_1.default.findById(req.params.id);
        if (!gpuComponent) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        const updatedGPUComponent = yield GPU_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedGPUComponent) {
            res.status(500).json({ message: 'Error updating GPU' });
            return;
        }
        res.status(200).json(updatedGPUComponent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteGPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['GPU']
    /* #swagger.security = [{"bearerAuth": []}] */
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const deleted = yield GPU_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        res.status(204).json(deleted);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const validateGPUComponentQuery = (query) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string(),
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        family: joi_1.default.string(),
        series: joi_1.default.string(),
        generation: joi_1.default.string(),
        architecture: joi_1.default.string(),
        baseClock: joi_1.default.number(),
        boostClock: joi_1.default.number(),
        vram: joi_1.default.number(),
        memoryType: joi_1.default.string(),
        memorySpeed: joi_1.default.number(),
        tdp: joi_1.default.number(),
        busWidth: joi_1.default.number(),
        pcieSupport: joi_1.default.string(),
        maxPcieLanes: joi_1.default.number(),
        computeCores: joi_1.default.number(),
        virtualisationSupport: joi_1.default.boolean(),
    });
    return schema.validate(query);
};
const validateGPUComponentUpdate = (query) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        images: joi_1.default.array(),
        family: joi_1.default.string(),
        series: joi_1.default.string(),
        generation: joi_1.default.string(),
        architecture: joi_1.default.string(),
        baseClock: joi_1.default.number(),
        boostClock: joi_1.default.number(),
        vram: joi_1.default.number(),
        memoryType: joi_1.default.string(),
        memorySpeed: joi_1.default.number(),
        tdp: joi_1.default.number(),
        busWidth: joi_1.default.number(),
        pcieSupport: joi_1.default.string(),
        maxPcieLanes: joi_1.default.number(),
        computeCores: joi_1.default.number(),
        virtualisationSupport: joi_1.default.boolean(),
    });
    return schema.validate(query);
};
const validateGPUComponent = (gpu) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        images: joi_1.default.string(),
        family: joi_1.default.string().required(),
        series: joi_1.default.string().required(),
        generation: joi_1.default.string().required(),
        architecture: joi_1.default.string().required(),
        baseClock: joi_1.default.number().required(),
        boostClock: joi_1.default.number().required(),
        vram: joi_1.default.number().required(),
        memoryType: joi_1.default.string().required(),
        memorySpeed: joi_1.default.number().required(),
        tdp: joi_1.default.number().required(),
        busWidth: joi_1.default.number().required(),
        pcieSupport: joi_1.default.string().required(),
        maxPcieLanes: joi_1.default.number().required(),
        computeCores: joi_1.default.number().required(),
        virtualisationSupport: joi_1.default.boolean().required(),
    });
    return schema.validate(gpu);
};
exports.default = {
    getGPUComponents,
    getGPUComponentById,
    createGPUComponent,
    updateGPUComponent,
    deleteGPUComponent,
};
