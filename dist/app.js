import express, {} from "express";
import { logger } from "./middleware/logger";
import { globalError } from "./middleware/globalError";
import rootRouter from "./api/router";
const app = express();
// Global Middlewares
app.use(express.json());
app.use(logger);
// Base API Route Setup
app.use("/api", rootRouter);
app.get('/', (req, res) => {
    res.send("Hello World");
});
// Global Error Handler
app.use(globalError);
export default app;
//# sourceMappingURL=app.js.map