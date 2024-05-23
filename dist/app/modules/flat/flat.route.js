"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatRoutes = void 0;
const express_1 = require("express");
const flat_controller_1 = require("./flat.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const flat_validation_1 = require("./flat.validation");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(), flat_controller_1.FlatController.getAllFlat);
router.post('/', (0, auth_1.default)(), (0, validateRequest_1.default)(flat_validation_1.FlatValidation.flatValidationSchema), flat_controller_1.FlatController.createFlat);
router.patch('/:flatId', (0, auth_1.default)(), (0, validateRequest_1.default)(flat_validation_1.FlatValidation.updateFlatValidationSchema), flat_controller_1.FlatController.updateFlat);
exports.FlatRoutes = router;
