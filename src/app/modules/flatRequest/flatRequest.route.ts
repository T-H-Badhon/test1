import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { FlatShareRequestController } from './flatRequest.controller';

const router = express.Router();

router.post("/create",
    auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
    FlatShareRequestController.createFlatRequest
)
router.get('/',
auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
FlatShareRequestController.getAllFlatRequestData
)
router.get('/:id',
auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
FlatShareRequestController.getSingleFlatRequestData
)

export const FlatShareRequestRoutes = router;