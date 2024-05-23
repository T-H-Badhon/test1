import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { userService } from "./user.service";
import pick from "../../utils/pick";
import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import { userFilterableFields, userSearchAbleFields } from "./user.constant";
import { paginationHelper } from "../../utils/paginateHelper";
import { IAuthUser } from "../../interface/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body)
    const result = await userService.createAdmin(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created successfully!",
        data: result
    })
});
const createUser = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body)
    const result = await userService.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created successfully!",
        data: result
    })
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await userService.getAllFromDB(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    })
});

const getMyProfile = catchAsync(async (req: Request  , res: Response) => {

    const user = req.user;
    // console.log(user)

    const result = await userService.getMyProfile(user as any);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

const editProfile = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.user)
    const { email } = req.user;

    const result = await userService.editProfileIntoDB(email, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile edited!",
        data: result
    })
});
const changeUserRole = catchAsync(async (req: Request, res: Response) => {

    const { userId } = req.params;
    console.log(userId);
    const result = await userService.changeUserRole(userId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile role changed!",
        data: result
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});




const updateMyProfile = catchAsync(async (req: Request , res: Response) => {

    const user = req.user;

    const result = await userService.updateMyProfile(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile updated!",
        data: result
    })
});

export const userController = {
    createAdmin,
    createUser,
    getAllFromDB,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile,
    changeUserRole,
    editProfile
}