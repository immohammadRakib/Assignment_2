"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const issue_controller_1 = require("../controllers/issue.controller");
const router = (0, express_1.Router)();
// Public Routes
router.get("/", issue_controller_1.getAllIssues);
router.get("/:id", issue_controller_1.getSingleIssue);
// Protected Routes
router.post("/", auth_middleware_1.protect, issue_controller_1.createIssue);
router.patch("/:id", auth_middleware_1.protect, issue_controller_1.updateIssue);
router.delete("/:id", auth_middleware_1.protect, auth_middleware_1.restrictToMaintainer, issue_controller_1.deleteIssue); // 
exports.default = router;
//# sourceMappingURL=issue.route.js.map