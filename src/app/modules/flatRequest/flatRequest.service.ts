import httpStatus from "http-status";
import { TFlatShareRequest } from "./flatRequest.interface";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";


const createFlatRequestIntoDB = async (payload: TFlatShareRequest) => {
    // console.log(payload)
 
    const alreadyExistsFlatRequest = await prisma.flatRequest.findFirst({
        where: {
            flatId: payload.flatId
        }
    })
    if (alreadyExistsFlatRequest) {
   throw new AppError(httpStatus.CONFLICT,"Already exists Flat Request")
    }
    const result = await prisma.flatRequest.create({
        data: payload,
        include: {
            user: true,
            flat: true
          },
    },)
    // console.log(result)
    return result
}

const getAllFlatRequestDataFromDB = async (userId:string) => {
    const result = await prisma.flatRequest.findMany({
        where: {
            userId
        }, include: {
            flat: true
        }
    })
    return result
}

const getSingleFlatRequestDataFromDB = async (flatId: string) => {
    const result = await prisma.flatRequest.findFirstOrThrow({
        where: {
            flatId
        }, include: {
            flat: true
        }
    })
    return result
}

export const FlatShareRequestServices = {
    createFlatRequestIntoDB,
    getAllFlatRequestDataFromDB,
    getSingleFlatRequestDataFromDB
}