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
    res.status(200).json({
        success: true,
        message: "Welcome to the Assignment 2 Backend API",
        version: "1.0.0",
        status: "Server is running smoothly",
        author: "Md Abdur Rahman Rakib", 
        documentation: "https://github.com/immohammadRakib/Assignment_2" 
    });
});

// Global Error Handler
app.use(globalError);

export default app;
