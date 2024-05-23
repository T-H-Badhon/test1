import { Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { FlatShareRequestServices } from "./flatRequest.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createFlatRequest = catchAsync(async (req: Request, res: Response) => {
  const { flatId } = req.body;
  const { id:userId } = req.user;
  const flatRequestData = {
    flatId,
    userId,
  };
  const result = await FlatShareRequestServices.createFlatRequestIntoDB(
    flatRequestData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat Share Request created successfully",
    data: result,
  });
});

const getAllFlatRequestData = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const result = await FlatShareRequestServices.getAllFlatRequestDataFromDB(
      userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flat Share Request retrieved successfully",
      data: result,
    });
  }
);
const getSingleFlatRequestData = catchAsync(
  async (req: Request, res: Response) => {
    const { flatId } = req.params;
    const result = await FlatShareRequestServices.getSingleFlatRequestDataFromDB(
      flatId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flat Share Request retrieved successfully",
      data: result,
    });
  }
);

export const FlatShareRequestController = {
  createFlatRequest,
  getAllFlatRequestData,
  getSingleFlatRequestData,
};
