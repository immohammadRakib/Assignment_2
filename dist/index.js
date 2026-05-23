"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const db_1 = require("./db");
const main = async () => {
    // console.log(config.database_url)
    await (0, db_1.initDB)();
    app_1.default.listen(config_1.default.port, () => {
        console.log(`Server is Running on Port ${config_1.default.port}`);
    });
};
main();
//# sourceMappingURL=index.js.map