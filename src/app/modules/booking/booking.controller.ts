import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { Request, Response } from "express";
// interface AuthenticatedRequest extends Request {
//     user: { id: string }; // Define the structure of user object here
// }

const createFlat = catchAsync(async(req:Request & {user?:{id: string}}  ,res:Response) => {
    const {flatId} = req.body;
    // console.log('flatId',flatId)
    const userId = req?.user?.id;
    // console.log('UserId',userId)

    const result = await BookingServices.createFlatBookingIntoDB(flatId,userId);
    // console.log(result)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Booking requests submitted successfully',
        data:result
    })
})

const getAllBooking = catchAsync( async (req:Request & {user?:{id: string}} , res:Response) => {
    const id = req?.user?.id;
    const result = await BookingServices.getALlBookingFromDB(id as string);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Booking requests retrieved successfully',
        data:result
    })
})
const updateBooking = catchAsync( async (req, res) => {
    const bookingId = req.params.bookingId;
    // console.log(bookingId)
    // const {status} = req.body;
    const result = await BookingServices.updateBookingFromDB(bookingId,req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Booking request updated successfully',
        data:result
    })
})

export const  BookingController = {
    createFlat,
    getAllBooking,
    updateBooking
}