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
exports.BookingServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createFlatBookingIntoDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const flat = yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id,
        }
    });
    const booking = yield prisma_1.default.booking.create({
        data: {
            flat: { connect: { id: id } },
            user: { connect: { id: userId } },
            status: "PENDING"
        }
    });
    const responseData = {
        id: booking.id,
        userId: booking.userId,
        flatId: booking.flatId,
        status: booking.status,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
    };
    return responseData;
});
const getALlBookingFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingRequests = yield prisma_1.default.booking.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            userId: true,
            flatId: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return bookingRequests;
});
const updateBookingFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.booking.findUniqueOrThrow({
        where: {
            id,
        }
    });
    //    console.log(data)
    // console.log("update", payload);
    // console.log("id", id);
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.BookingServices = {
    createFlatBookingIntoDB,
    getALlBookingFromDB,
    updateBookingFromDB
};
