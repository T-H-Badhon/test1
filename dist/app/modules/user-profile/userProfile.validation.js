"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileValidation = void 0;
const zod_1 = require("zod");
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        profession: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    })
});
exports.UserProfileValidation = {
    updateUserProfileValidationSchema
};
