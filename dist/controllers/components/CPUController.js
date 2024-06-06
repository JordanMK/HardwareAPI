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
const CPU_1 = __importDefault(require("../../models/components/CPU"));
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const queryController_1 = require("../queryController");
const getCPUComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['CPU']
    const query = Object.values(req.query).length > 0 ? req.query : req.body;
    const tranformedQuery = (0, queryController_1.transformDotNotation)(query);
    const { error } = validateCPUComponentQuery(tranformedQuery);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const cpuComponents = yield CPU_1.default.find(query);
        res.status(200).json(cpuComponents);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getCPUComponentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const component = yield CPU_1.default.findById(req.params.id);
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
const createCPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['CPU']
    /* #swagger.security = [{"bearerAuth": []}] */
    /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/CPU" }
    } */
    const body = req.body;
    const { error } = validateCPUComponent(body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const nameRegex = new RegExp(body.name, 'i');
        const duplicate = yield CPU_1.default.find({ name: nameRegex });
        console.log(duplicate);
        if (duplicate.length > 0) {
            res.status(409).json({ message: 'This component already exists' });
            return;
        }
        const cpuComponent = yield CPU_1.default.create(body);
        if (!cpuComponent) {
            res.status(500).json({ message: 'Error creating CPU' });
        }
        res.status(201).json(cpuComponent);
    }
    catch (error) {
        const errorDetails = { message: error.message };
        res.status(500).json(errorDetails);
    }
});
const updateCPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['CPU']
    /* #swagger.security = [{"bearerAuth": []}] */
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    const { error } = validateCPUComponentUpdate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const cpuComponent = yield CPU_1.default.findById(req.params.id);
        if (!cpuComponent) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        const updatedCPUComponent = yield CPU_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedCPUComponent) {
            res.status(500).json({ message: 'Error updating CPU' });
            return;
        }
        res.status(200).json(updatedCPUComponent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteCPUComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const deleted = yield CPU_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const validateCPUComponentQuery = (query) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string(),
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        family: joi_1.default.string(),
        series: joi_1.default.string(),
        generation: joi_1.default.string(),
        architecture: joi_1.default.string(),
        cores: joi_1.default.number(),
        threads: joi_1.default.number(),
        baseClock: joi_1.default.number(),
        boostClock: joi_1.default.number(),
        tdp: joi_1.default.number(),
        socket: joi_1.default.string(),
        technology: joi_1.default.number(),
        integratedGraphics: joi_1.default.object({
            name: joi_1.default.string(),
            brand: joi_1.default.string(),
            generation: joi_1.default.string(),
            architecture: joi_1.default.string(),
            baseClock: joi_1.default.number(),
            boostClock: joi_1.default.number(),
        }),
        cache: joi_1.default.object({
            l1: joi_1.default.string(),
            l2: joi_1.default.string(),
            l3: joi_1.default.string(),
        }),
        hyperthreading: joi_1.default.boolean(),
        pcieSupport: joi_1.default.string(),
        maxPcieLanes: joi_1.default.number(),
        virtualisationSupport: joi_1.default.boolean(),
    });
    return schema.validate(query);
};
const validateCPUComponentUpdate = (query) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        family: joi_1.default.string(),
        series: joi_1.default.string(),
        generation: joi_1.default.string(),
        architecture: joi_1.default.string(),
        cores: joi_1.default.number(),
        threads: joi_1.default.number(),
        baseClock: joi_1.default.number(),
        boostClock: joi_1.default.number(),
        tdp: joi_1.default.number(),
        socket: joi_1.default.string(),
        technology: joi_1.default.number(),
        integratedGraphics: joi_1.default.object({
            name: joi_1.default.string(),
            brand: joi_1.default.string(),
            generation: joi_1.default.string(),
            architecture: joi_1.default.string(),
            baseClock: joi_1.default.number(),
            boostClock: joi_1.default.number(),
        }),
        cache: joi_1.default.object({
            l1: joi_1.default.string(),
            l2: joi_1.default.string(),
            l3: joi_1.default.string(),
        }),
        hyperthreading: joi_1.default.boolean(),
        pcieSupport: joi_1.default.string(),
        maxPcieLanes: joi_1.default.number(),
        virtualisationSupport: joi_1.default.boolean(),
    });
    return schema.validate(query);
};
const validateCPUComponent = (cpu) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        images: joi_1.default.array(),
        family: joi_1.default.string().required(),
        series: joi_1.default.string().required(),
        generation: joi_1.default.string().required(),
        architecture: joi_1.default.string().required(),
        cores: joi_1.default.number().required(),
        threads: joi_1.default.number().required(),
        baseClock: joi_1.default.number().required(),
        boostClock: joi_1.default.number().required(),
        tdp: joi_1.default.number().required(),
        socket: joi_1.default.string().required(),
        technology: joi_1.default.number().required(),
        integratedGraphics: joi_1.default.object({
            name: joi_1.default.string().required(),
            brand: joi_1.default.string().required(),
            generation: joi_1.default.string().required(),
            architecture: joi_1.default.string().required(),
            baseClock: joi_1.default.number().required(),
            boostClock: joi_1.default.number().required(),
        }),
        cache: joi_1.default.object({
            l1: joi_1.default.string().required(),
            l2: joi_1.default.string().required(),
            l3: joi_1.default.string().required(),
        }).required(),
        hyperthreading: joi_1.default.boolean().required(),
        pcieSupport: joi_1.default.string().required(),
        maxPcieLanes: joi_1.default.number().required(),
        virtualisationSupport: joi_1.default.boolean().required(),
    });
    return schema.validate(cpu);
};
exports.default = {
    getCPUComponents,
    getCPUComponentById,
    createCPUComponent,
    updateCPUComponent,
    deleteCPUComponent,
};
