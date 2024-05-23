"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const hnadleZodError_1 = __importDefault(require("../errors/hnadleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || 'Something went wrong';
    let errorDetails = {
        issues: [{
                field: '',
                message: 'something went wrong'
            }]
    };
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, hnadleZodError_1.default)(err);
        // console.log("simpl",simplifiedError.errorDetails)
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode,
            message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorDetails;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails
    });
};
exports.default = globalErrorHandler;
// import { ErrorRequestHandler } from 'express'
// import { ZodError } from 'zod'
// import AppError from '../errors/AppError'
// import handleZodError from '../errors/hnadleZodError'
// // import handleZodError, { ZodErrorMessageGenerator } from '../errors/hnadleZodError'
// // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   let message = 'something went Wrong'
// //   let errorMessage = 'something went Wrong'
//   let statusCode = 500
//   let errorDetails = {
//             issues:[ {
//                 field:'',
//                 message:'something went wrong'
//             }]
//         }
//   if (err instanceof ZodError) {
//     const simplifiedError = handleZodError(err)
//     // console.log("final",simplifiedError)
//     // statusCode = simplifiedError?.statusCode
//     // message = simplifiedError
//   } 
// //    else if (err instanceof AppError) {
// //     statusCode = err.statusCode
// //     message = 'BAD REQUEST!'
// //     // errorMessage = err.message
// //   } else if (err instanceof Error) {
// //     message = 'Something Went Wrong!'
// //     // errorMessage = err.message
// //   }
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     // errorMessage,
//     errorDetails: err,
//     // stack: err?.stack,
//   })
// }
// export default globalErrorHandler
