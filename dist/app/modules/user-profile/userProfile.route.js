"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRoutes = void 0;
const express_1 = require("express");
const userProfile_controller_1 = require("./userProfile.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userProfile_validation_1 = require("./userProfile.validation");
// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   console.log(token)
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       statusCode: 401,
//       message: 'Unauthorized: Missing token'
//     });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(403).json({
//       success: false,
//       statusCode: 403,
//       message: 'Forbidden: Invalid token'
//     });
//   }
// };
router.get('/profile', (0, auth_1.default)(), userProfile_controller_1.UserProfileController.getUserProfile);
router.put('/profile', (0, auth_1.default)(), (0, validateRequest_1.default)(userProfile_validation_1.UserProfileValidation.updateUserProfileValidationSchema), userProfile_controller_1.UserProfileController.updateUserprofile);
exports.UserProfileRoutes = router;
