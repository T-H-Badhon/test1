import { z } from 'zod';

const loginZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});



const registerSchema = z.object({
    body:z.object({
    name: z.string({
        required_error:'Name Is Required'
    }),
    email: z.string({
        required_error:"Email is required"
    }),
    password: z.string({
        required_error:"Password is required"
    }),
    bio: z.string({
        required_error:"Bio is required"
    }),
    profession: z.string({
        required_error:"Profession is required"
    }),
    address: z.string({
        required_error:"Address is required"
    }),
    })
});





export const AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    registerSchema
};