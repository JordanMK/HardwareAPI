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
const RAM_1 = __importDefault(require("../../models/components/RAM"));
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const queryController_1 = require("../queryController");
const getRAMComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['RAM']
    const query = Object.values(req.query).length > 0 ? req.query : req.body;
    const tranformedQuery = (0, queryController_1.transformDotNotation)(query);
    const { error } = validateRAMComponentQuery(tranformedQuery);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const ramComponents = yield RAM_1.default.find(query);
        res.status(200).json(ramComponents);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getRAMComponentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const component = yield RAM_1.default.findById(req.params.id);
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
const createRAMComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['RAM']
    /* #swagger.security = [{"bearerAuth": []}] */
    /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/RAM" }
    } */
    const body = req.body;
    const { error } = validateRAMComponent(body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const nameRegex = new RegExp(body.name, 'i');
        const duplicate = yield RAM_1.default.find({ name: nameRegex });
        if (duplicate) {
            res.status(409).json({ message: 'This component already exists' });
            return;
        }
        const ramComponent = yield RAM_1.default.create(body);
        if (!ramComponent) {
            res.status(500).json({ message: 'Error creating RAM' });
        }
        res.status(201).json(ramComponent);
    }
    catch (error) {
        const errorDetails = { message: error.message };
        res.status(500).json(errorDetails);
    }
});
const updateRAMComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['RAM']
    /* #swagger.security = [{"bearerAuth": []}] */
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    const { error } = validateRAMComponentUpdate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const ramComponent = yield RAM_1.default.findById(req.params.id);
        if (!ramComponent) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        const updatedRAMComponent = yield RAM_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedRAMComponent) {
            res.status(500).json({ message: 'Error updating RAM' });
            return;
        }
        res.status(200).json(updatedRAMComponent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteRAMComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const deleted = yield RAM_1.default.findByIdAndDelete(req.params.id);
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
const validateRAMComponentQuery = (query) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string(),
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        images: joi_1.default.array(),
        series: joi_1.default.string(),
        memoryType: joi_1.default.string(),
        formFactor: joi_1.default.string(),
        eccSupport: joi_1.default.boolean(),
        baseClock: joi_1.default.number(),
        memorySpeed: joi_1.default.number(),
        casLatency: joi_1.default.string(),
        voltage: joi_1.default.number(),
    });
    return schema.validate(query);
};
const validateRAMComponentUpdate = (query) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string(),
        name: joi_1.default.string(),
        images: joi_1.default.array(),
        series: joi_1.default.string(),
        memoryType: joi_1.default.string(),
        formFactor: joi_1.default.string(),
        eccSupport: joi_1.default.boolean(),
        baseClock: joi_1.default.number(),
        memorySpeed: joi_1.default.number(),
        casLatency: joi_1.default.string(),
        voltage: joi_1.default.number(),
    });
    return schema.validate(query);
};
const validateRAMComponent = (ram) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        images: joi_1.default.array(),
        series: joi_1.default.string().required(),
        memoryType: joi_1.default.string().required(),
        formFactor: joi_1.default.string().required(),
        eccSupport: joi_1.default.boolean().required(),
        baseClock: joi_1.default.number().required(),
        memorySpeed: joi_1.default.number().required(),
        casLatency: joi_1.default.string().required(),
        voltage: joi_1.default.number().required(),
    });
    return schema.validate(ram);
};
exports.default = {
    getRAMComponents,
    getRAMComponentById,
    createRAMComponent,
    updateRAMComponent,
    deleteRAMComponent,
};
