import { Router } from "express";
import { protect, restrictToMaintainer } from "../../middleware/auth.middleware";
import { createIssue, deleteIssue, getAllIssues, getSingleIssue, updateIssue } from "../controllers/issue.controller";
const router = Router();
// Public Routes
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
// Protected Routes
router.post("/", protect, createIssue);
router.patch("/:id", protect, updateIssue);
router.delete("/:id", protect, restrictToMaintainer, deleteIssue); // 
export default router;
//# sourceMappingURL=issue.route.js.map