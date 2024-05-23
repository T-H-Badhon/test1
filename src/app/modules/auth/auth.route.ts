import { Router } from "express"
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post('/login',validateRequest(AuthValidation.loginZodSchema),AuthController.login)
router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenZodSchema),AuthController.refreshToken)
router.post('/register',validateRequest(AuthValidation.registerSchema),AuthController.register)

export const AuthRoutes = router;