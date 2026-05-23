import { Router } from "express";
import authRouter from "./auth.route";
import issueRouter from "./issue.route";
const rootRouter = Router();
// Moduler Routing Conneted 
rootRouter.use("/auth", authRouter);
rootRouter.use("/issues", issueRouter);
export default rootRouter;
//# sourceMappingURL=index.js.map