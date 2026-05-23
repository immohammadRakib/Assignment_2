"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
// Public Route
authRouter.post('/signup', auth_controller_1.signUp);
authRouter.post('/login', auth_controller_1.login);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map