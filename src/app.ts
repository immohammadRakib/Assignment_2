import express, { type Application, type Request, type Response } from "express"
import { logger } from "./middleware/logger"
import { globalError } from "./middleware/globalError";
import rootRouter from "./api/router"; 

const app: Application = express()

// Global Middlewares
app.use(express.json())
app.use(logger);

// Base API Route Setup
app.use("/api", rootRouter); 

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})

// Global Error Handler
app.use(globalError);

export default app;
