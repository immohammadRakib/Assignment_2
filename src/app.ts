import express, { type Application, type Request, type Response } from "express"
import { logger } from "./middleware/logger"
import { globalError } from "./middleware/globalError";
import router from "./api/router/auth.route";

const app: Application = express()


app.use(express.json())

app.use(logger);
app.use(router)

app.get('/', (req: Request, res: Response) => {
    // throw new Error("server is dying")
    res.send("Hello World")
})

app.use(globalError);


export default app;