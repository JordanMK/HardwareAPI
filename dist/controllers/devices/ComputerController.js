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
const models_1 = require("../../types/models");
const Computer_1 = __importDefault(require("../../models/devices/Computer"));
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const getComputers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.values(req.query).length > 0 ? req.query : req.body;
    // const tranformedQuery = transformDotNotation(query);
    // const { error } = validateCPUComponentQuery(tranformedQuery);
    // if (error) {
    // 	res.status(400).json({ message: error.message });
    // 	return;
    // }
    try {
        const computers = yield Computer_1.default.find()
            .populate('cpu')
            .populate('ram')
            .populate('gpu');
        res.status(200).json(computers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const createComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = validateComputer(body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const nameRegex = new RegExp(body.name, 'i');
        const duplicate = yield Computer_1.default.find({ name: nameRegex });
        console.log(duplicate);
        if (duplicate.length > 0) {
            res.status(409).json({ message: 'This computer already exists' });
            return;
        }
        const computer = yield Computer_1.default.create(body);
        if (!computer) {
            res.status(500).json({ message: 'Error creating computer' });
        }
        res.status(201).json(computer);
    }
    catch (error) {
        const errorDetails = { message: error.message };
        res.status(500).json(errorDetails);
    }
});
const deleteComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }
    try {
        const deleted = yield Computer_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Computer not found' });
            return;
        }
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const validateComputer = (computer) => {
    const schema = joi_1.default.object({
        brand: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        images: joi_1.default.array(),
        computerType: joi_1.default.string()
            .allow(...Object.values(models_1.ComponentType))
            .required(),
        cpu: joi_1.default.string().required(),
        gpu: joi_1.default.string(),
        ram: joi_1.default.string().required(),
        ramModules: joi_1.default.number().required(),
        ramCapacity: joi_1.default.number().required(),
    });
    return schema.validate(computer);
};
exports.default = {
    getComputers,
    createComputer,
    deleteComputer,
};
