"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generateToken = (payload) => {
    // console.log(config.jwt.expires_in)
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.jwt_secret, {
        algorithm: 'HS256',
        expiresIn: '30d'
    });
    return token;
};
exports.default = generateToken;
