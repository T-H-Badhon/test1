import { RequestHandler } from "express"
import prisma from "../../utils/prisma"



const createFlatBookingIntoDB = async(id:any,userId:any) => {
    
    const flat = await prisma.flat.findUniqueOrThrow({
        where:{
            id,
        }
       })
    
    const booking = await prisma.booking.create({
        data: {
            flat: { connect: { id: id } },
            user: { connect: { id: userId } },
            status: "PENDING"
          }
    })
    const responseData = {
        id: booking.id,
        userId: booking.userId,
        flatId: booking.flatId,
        status: booking.status,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      };

      return responseData;
}

const getALlBookingFromDB = async(userId:string) => {
    const bookingRequests = await prisma.booking.findMany({
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
}

const updateBookingFromDB = async(id:string,payload:any) => {
    const data =await prisma.booking.findUniqueOrThrow({
        where:{
            id,
        }
       })
    //    console.log(data)
    // console.log("update", payload);
    // console.log("id", id);
       const result = await prisma.booking.update({
           where:{
               id,
           },
           data:payload,
       })
       return result;
}

export const BookingServices = {
    createFlatBookingIntoDB,
    getALlBookingFromDB,
    updateBookingFromDB
}