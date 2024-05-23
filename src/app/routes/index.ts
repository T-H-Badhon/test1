import { Router } from "express";
import { UserProfileRoutes } from "../modules/user-profile/userProfile.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { FLatRoutes } from "../modules/flat/flat.route";
import { FlatShareRequestRoutes } from "../modules/flatRequest/flatRequest.route";


const router = Router();

const moduleRoutes = [
    {
        path:'/flat',
        route: FLatRoutes
    },
    
    {
        path:'/',
        route: AuthRoutes
    },
    {
        path:'/',
        route: BookingRoutes
    },
    {
        path:'/user',
        route: UserRoutes
    },
    {
        path:'/admin',
        route: AdminRoutes
    },
    {
        path:'/flat-share',
        route: FlatShareRequestRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default  router;