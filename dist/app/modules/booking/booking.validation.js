"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        flatId: zod_1.z.string()
    })
});
const updateBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string()
    })
});
exports.BookingValidation = {
    bookingValidation,
    updateBookingValidation
};
