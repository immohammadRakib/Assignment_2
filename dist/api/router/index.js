"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const issue_route_1 = __importDefault(require("./issue.route"));
const rootRouter = (0, express_1.Router)();
// Moduler Routing Conneted 
rootRouter.use("/auth", auth_route_1.default);
rootRouter.use("/issues", issue_route_1.default);
exports.default = rootRouter;
//# sourceMappingURL=index.js.map