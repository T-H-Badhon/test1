"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post('/booking-applications', (0, auth_1.default)(), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.bookingValidation), booking_controller_1.BookingController.createFlat);
router.get('/booking-requests', (0, auth_1.default)(), booking_controller_1.BookingController.getAllBooking);
router.put('/booking-requests/:bookingId', (0, auth_1.default)(), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingValidation), booking_controller_1.BookingController.updateBooking);
exports.BookingRoutes = router;
