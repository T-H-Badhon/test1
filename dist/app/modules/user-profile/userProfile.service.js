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
exports.UserProfileServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getUserProfileFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
        where: {
            userId: user.id,
        }
    });
    return result;
});
const updateUserProfileFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const data = req.body;
    const result = yield prisma_1.default.userProfile.update({
        where: {
            userId: userId
        },
        data: data,
    });
    return result;
});
exports.UserProfileServices = {
    getUserProfileFromDB,
    updateUserProfileFromDB
};
