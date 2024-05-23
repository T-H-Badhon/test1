"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatValidation = void 0;
const zod_1 = require("zod");
const flatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // id: z.string(),
        squareFeet: zod_1.z.number(),
        totalBedrooms: zod_1.z.number(),
        totalRooms: zod_1.z.number(),
        utilitiesDescription: zod_1.z.string(),
        location: zod_1.z.string(),
        description: zod_1.z.string(),
        rent: zod_1.z.number(),
        availability: zod_1.z.boolean().default(true),
        advanceAmount: zod_1.z.number(),
    })
});
const updateFlatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // id: z.string(),
        squareFeet: zod_1.z.number().optional(),
        totalBedrooms: zod_1.z.number().optional(),
        totalRooms: zod_1.z.number().optional(),
        utilitiesDescription: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        rent: zod_1.z.number().optional(),
        availability: zod_1.z.boolean().optional(),
        advanceAmount: zod_1.z.number().optional(),
    })
});
exports.FlatValidation = {
    flatValidationSchema,
    updateFlatValidationSchema
};
