import { Router } from "express";
import { userController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";


const router = Router();

router.post('/create-admin',userController.createAdmin)

// router.post(
//     "/create-user",
//     fileUploader.upload.single("file"),
//     (req: Request, res: Response, next: NextFunction) => {
//       req.body = userValidation.createUser.parse(JSON.parse(req.body.data));
//       return userController.createUser(req, res, next);
//     }
//   );
router.post(
    "/create-user",userController.createUser,
  );

  router.get(
    "/",
    // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userController.getAllFromDB
  );

  router.get(
    "/me",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN,UserRole.USER,UserRole.SELLER),
    userController.getMyProfile
  );
  router.patch(
    "/editProfile",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN,UserRole.USER,UserRole.SELLER),
    validateRequest(userValidation.editProfile),
    userController.editProfile
  );
  
  router.patch(
    "/:id/status",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidation.updateStatus),
    userController.changeProfileStatus
  );
  
  router.patch(
    "/:userId/role",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidation.updateRole),
    userController.changeUserRole
  );
  
  router.patch(
    "/profile",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN,UserRole.USER,UserRole.SELLER), userController.updateMyProfile
  );
  
  // router.patch(
  //   "/update-my-profile",
  //   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN,UserRole.USER,UserRole.SELLER),
  //   fileUploader.upload.single("file"),
  //   (req: Request, res: Response, next: NextFunction) => {
  //     req.body = JSON.parse(req.body.data);
  //     return userController.updateMyProfile(req, res, next);
  //   }
  // );
  
export const UserRoutes = router;