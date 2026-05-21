import type { Request, Response } from "express";
import issueService from "../service/issue.service";

// Create Issue
export const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body;
    
    if (title.length > 150) {
      return res.status(400).json({ success: false, message: "Title maximum 150 characters" });
    }
    if (description.length < 20) {
      return res.status(400).json({ success: false, message: "Description minimum 20 characters" });
    }

    const issue = await issueService.createIssue({
      title,
      description,
      type,
      reporter_id: req.user!.id 
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to create issue", errors: error.message });
  }
};

// Get All Issue
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query;
    const issues = await issueService.getAllIssues({
      sort: sort as string,
      type: type as string,
      status: status as string
    });
    return res.status(200).json({ success: true, data: issues });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to get issues", errors: error.message });
  }
};

// Get Issue by ID
export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.getIssueById(Number(req.params.id));
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }
    return res.status(200).json({ success: true, data: issue });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to get issue", errors: error.message });
  }
};

// Update Issue
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);
    const existingIssue = await issueService.getIssueById(issueId);

    if (!existingIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    const currentUser = req.user!;

    if (currentUser.role !== "maintainer") {
      if ((existingIssue as any).reporter.id !== currentUser.id) {
        return res.status(403).json({ success: false, message: "You can only update your own issues" });
      }
    
      if ((existingIssue as any).status !== "open") {
        return res.status(403).json({ success: false, message: "Contributors can only update issues if status is open" });
      }
      
      delete req.body.status;
    }

    const updatedIssue = await issueService.updateIssue(issueId, req.body);
    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to update issue", errors: error.message });
  }
};

// Delete Issue
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const isDeleted = await issueService.deleteIssue(Number(req.params.id));
    if (!isDeleted) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }
    return res.status(200).json({ success: true, message: "Issue deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to delete issue", errors: error.message });
  }
};
