import app from "./app.js";
import config from "./config";
import { initDB } from "./db";


const main = async () => {
    // console.log(config.database_url)
    await initDB();
    app.listen(config.port, () => {
        console.log(`Server is Running on Port ${config.port}`)
    })
}

main();