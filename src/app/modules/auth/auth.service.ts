import prisma from "../../utils/prisma"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import generateToken from "../../utils/generateToken";
import { decodedToken } from "../../utils/decodeToken";
import config from "../../../config";

const logInUser = async(payload:{
    email:string,
    password:string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload?.email,
        }
    })
    const isCorrectPassword:Boolean = await bcrypt.compareSync(payload.password, userData.password)
    if(!isCorrectPassword){
             throw new Error('Wrong Password')
        }
        // console.log(config.jwt.expires_in)
    const accessToken = generateToken({
        email:userData.email,
        id:userData.id,
        role:userData.role
    });
    const refreshToken =generateToken({
        email:userData.email,
        id:userData.id,
        role:userData.role
    }, )
    return {
        accessToken,
        refreshToken,
        user: {
            id: userData.id,
            name: userData.username,
            email: userData.email,
            role:userData.role
        }
    };
}

const refreshToken = async(token:string)=>{
    let decodedData;
    try {
         decodedData =decodedToken.verifyToken(token,config.jwt.refresh_token_secret as Secret)
    } catch (err) {
        throw new Error('You are not authorized')
    }
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where:{
            email:decodedData?.email,
            id:decodedData.id
        }
    });
    const accessToken = generateToken({
        email:isUserExist?.email,
    });
    return {
        accessToken,
    };
}

// const createUserIntoDB = async(data:any) => {
//     const hashedPassword:string=await bcrypt.hashSync(data.password, 10);

//     const userData = {
//       name:data.username,
//       email:data.email,
//       password:hashedPassword
//     }
//     const userProfile = {
//       bio:data.bio,
//       profession:data.profession,
//       address:data.address
//     }
//     const result = await prisma.$transaction(async(transactionClient) => {
//       const user = await transactionClient.user.create({
//         data: userData
//       })
  
//       const profile = await transactionClient.userProfile.create({
//           data:{...userProfile,userId:user.id}
//       })
//       const {password,...data}=user;
//       return data;

//     })
//     return result;
//   }


export const AuthServices = {
    logInUser,
    refreshToken,
    // createUserIntoDB
    
}