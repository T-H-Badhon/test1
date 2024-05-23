"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    let errorDetails = {
        issues: err.issues.map((issue) => {
            return {
                field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue === null || issue === void 0 ? void 0 : issue.message
            };
        })
    };
    // console.log(err)
    let errorMessage = '';
    err.issues.forEach((issue) => (errorMessage =
        errorMessage +
            `${issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]} is ${issue.message}. `));
    //   console.log(errorMessage)
    const statusCode = 400;
    return {
        statusCode,
        message: errorMessage,
        errorDetails
    };
};
exports.default = handleZodError;
