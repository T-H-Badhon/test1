"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
// import auth from "../../middlewares/auth";
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.UserController.createUser);
exports.UserRoute = router;
