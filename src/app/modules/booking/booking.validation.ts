import { z } from "zod";


const bookingValidation = z.object({
    body:z.object({
        flatId:z.string()
    })
});
const updateBookingValidation = z.object({
    body:z.object({
        status:z.string()
    })
});


export const BookingValidation = {
    bookingValidation,
    updateBookingValidation
}