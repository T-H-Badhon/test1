import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";

const login:RequestHandler = catchAsync(async(req,res) => {
    const result = await AuthServices.logInUser(req.body);
    const { refreshToken, accessToken, user } = result; 
    res.cookie('refreshToken',refreshToken,{
        secure:false,
        httpOnly : true
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            id: user.id, 
            name: user.name,
            email: user.email,
            token: accessToken,
        }
    });
})
const refreshToken:RequestHandler = catchAsync(async(req,res) => {
    const {refreshToken} = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
 

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Refresh token generated Successfully',
        data:result
        
    })
})

const register = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'User registered successfully',
        data:result
        
    })
})

export const AuthController ={
    login,
    refreshToken,
    register
    
}