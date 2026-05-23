"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.updateIssue = exports.getSingleIssue = exports.getAllIssues = exports.createIssue = void 0;
const issue_service_1 = __importDefault(require("../service/issue.service"));
// Create Issue
const createIssue = async (req, res) => {
    try {
        const { title, description, type } = req.body;
        if (title.length > 150) {
            return res.status(400).json({ success: false, message: "Title maximum 150 characters" });
        }
        if (description.length < 20) {
            return res.status(400).json({ success: false, message: "Description minimum 20 characters" });
        }
        const issue = await issue_service_1.default.createIssue({
            title,
            description,
            type,
            reporter_id: req.user.id
        });
        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to create issue", errors: error.message });
    }
};
exports.createIssue = createIssue;
// Get All Issue
const getAllIssues = async (req, res) => {
    try {
        const { sort, type, status } = req.query;
        const issues = await issue_service_1.default.getAllIssues({
            sort: sort,
            type: type,
            status: status
        });
        return res.status(200).json({ success: true, data: issues });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to get issues", errors: error.message });
    }
};
exports.getAllIssues = getAllIssues;
// Get Issue by ID
const getSingleIssue = async (req, res) => {
    try {
        const issue = await issue_service_1.default.getIssueById(Number(req.params.id));
        if (!issue) {
            return res.status(404).json({ success: false, message: "Issue not found" });
        }
        return res.status(200).json({ success: true, data: issue });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to get issue", errors: error.message });
    }
};
exports.getSingleIssue = getSingleIssue;
// Update Issue
const updateIssue = async (req, res) => {
    try {
        const issueId = Number(req.params.id);
        const existingIssue = await issue_service_1.default.getIssueById(issueId);
        if (!existingIssue) {
            return res.status(404).json({ success: false, message: "Issue not found" });
        }
        const currentUser = req.user;
        if (currentUser.role !== "maintainer") {
            if (existingIssue.reporter.id !== currentUser.id) {
                return res.status(403).json({ success: false, message: "You can only update your own issues" });
            }
            if (existingIssue.status !== "open") {
                return res.status(403).json({ success: false, message: "Contributors can only update issues if status is open" });
            }
            delete req.body.status;
        }
        const updatedIssue = await issue_service_1.default.updateIssue(issueId, req.body);
        return res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: updatedIssue
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update issue", errors: error.message });
    }
};
exports.updateIssue = updateIssue;
// Delete Issue
const deleteIssue = async (req, res) => {
    try {
        const isDeleted = await issue_service_1.default.deleteIssue(Number(req.params.id));
        if (!isDeleted) {
            return res.status(404).json({ success: false, message: "Issue not found" });
        }
        return res.status(200).json({ success: true, message: "Issue deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete issue", errors: error.message });
    }
};
exports.deleteIssue = deleteIssue;
//# sourceMappingURL=issue.controller.js.map