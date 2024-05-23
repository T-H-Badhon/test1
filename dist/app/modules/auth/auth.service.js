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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const decodeToken_1 = require("../../utils/decodeToken");
const config_1 = __importDefault(require("../../../config"));
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email,
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compareSync(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Wrong Password');
    }
    // console.log(config.jwt.expires_in)
    const accessToken = (0, generateToken_1.default)({
        email: userData.email,
        id: userData.id
    });
    const refreshToken = (0, generateToken_1.default)({
        email: userData.email,
        id: userData.id
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        }
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = decodeToken_1.decodedToken.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (err) {
        throw new Error('You are not authorized');
    }
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            id: decodedData.id
        }
    });
    const accessToken = (0, generateToken_1.default)({
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
    });
    return {
        accessToken,
    };
});
const createUserIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hashSync(data.password, 10);
    const userData = {
        name: data.name,
        email: data.email,
        password: hashedPassword
    };
    const userProfile = {
        bio: data.bio,
        profession: data.profession,
        address: data.address
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData
        });
        const profile = yield transactionClient.userProfile.create({
            data: Object.assign(Object.assign({}, userProfile), { userId: user.id })
        });
        const { password } = user, data = __rest(user, ["password"]);
        return data;
    }));
    return result;
});
exports.AuthServices = {
    logInUser,
    refreshToken,
    createUserIntoDB
};
