import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";



const router = Router();

router.post('/booking-applications',auth(),validateRequest(BookingValidation.bookingValidation),BookingController.createFlat)
router.get('/booking-requests',auth(),BookingController.getAllBooking)
router.put('/booking-requests/:bookingId',auth(),validateRequest(BookingValidation.updateBookingValidation),BookingController.updateBooking)

export const BookingRoutes = router;