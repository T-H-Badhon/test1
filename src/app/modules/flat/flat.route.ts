import express, { NextFunction, Request, Response } from "express";
import { FlatController } from "./flat.controller";
import { flatValidationSchemas } from "./flat.validation";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// router.post(
//   "/create-flat",
//   auth(UserRole.ADMIN,UserRole.USER,UserRole.SELLER,UserRole.SUPER_ADMIN),
//   multiFileUploader.upload.array("files", 10),
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.body = flatValidationSchemas.createFlatSchema.parse(
//       JSON.parse(req.body.data)
//     );
//     return FlatController.createFlat(req, res, next);
//   }
// );
router.post(
  "/create-flat",
  auth(UserRole.ADMIN,UserRole.USER,UserRole.SELLER,UserRole.SUPER_ADMIN),FlatController.createFlat
);
router.get('/',
  // auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.getFlats
)
router.get('/my-flat',
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.getFlats
)

router.get("/:id",
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.getSingleFlat
)

router.patch("/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  FlatController.updateFlat
)

router.patch("/updateMyFLat/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN,UserRole.USER,UserRole.SELLER),
  FlatController.updateMyFlat
)

router.delete("/deleteFlat/:id",
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.deleteFlat
)

export const FLatRoutes = router;
