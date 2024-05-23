// import { NextFunction, Request, Response } from "express";
// import { Secret } from "jsonwebtoken";
// import httpStatus from "http-status";
// import AppError from "../errors/AppError";
// import { decodedToken } from "../utils/decodeToken";

// const auth = () => {
//     return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
//         try {
//             const token = req.headers.authorization;

//             if (!token) {
//                 throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
//             }

//             const verifiedUser = decodedToken.verifyToken(token, 'asjchgsccvbfh');
//             // console.log(verifiedUser)

//             req.user = verifiedUser;
//             // req.token=token;

//             next();
//         } catch (err) {
//             next(err);
//         }
//     };
// };

// export default auth;

import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { decodedToken } from "../utils/decodeToken";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = decodedToken.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      // console.log(verifiedUser)


      req.user = verifiedUser 
      // console.log(req.user)
      // console.log(roles)

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

