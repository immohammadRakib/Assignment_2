import type { Issue } from "../../types";
declare class IssueService {
    createIssue(issueData: Partial<Issue>): Promise<any>;
    getAllIssues(filters: {
        sort?: string;
        type?: string;
        status?: string;
    }): Promise<any[]>;
    getIssueById(id: number): Promise<any>;
    updateIssue(id: number, updateData: Partial<Issue>): Promise<any>;
    deleteIssue(id: number): Promise<boolean | 0 | null>;
}
declare const _default: IssueService;
export default _default;
//# sourceMappingURL=issue.service.d.ts.map