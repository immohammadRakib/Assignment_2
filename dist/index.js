import app from "./app";
import config from "./config";
import { initDB } from "./db";
const main = async () => {
    // console.log(config.database_url)
    await initDB();
    app.listen(config.port, () => {
        console.log(`Server is Running on Port ${config.port}`);
    });
};
main();
//# sourceMappingURL=index.js.map