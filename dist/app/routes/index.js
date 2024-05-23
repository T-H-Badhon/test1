"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flat_route_1 = require("../modules/flat/flat.route");
const userProfile_route_1 = require("../modules/user-profile/userProfile.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/flats',
        route: flat_route_1.FlatRoutes
    },
    {
        path: '/',
        route: userProfile_route_1.UserProfileRoutes
    },
    {
        path: '/',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/',
        route: booking_route_1.BookingRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
