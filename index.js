"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("./middlewares/error.middlewares");
const Novels_Routes_1 = __importDefault(require("./routes/Novels.Routes"));
const User_Routes_1 = __importDefault(require("./routes/User.Routes"));
const Admin_Routes_1 = __importDefault(require("./routes/Admin.Routes"));
const database_services_1 = require("./services/database.services");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
database_services_1.databaseService.run();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', User_Routes_1.default);
app.use('/novels', Novels_Routes_1.default);
app.use('/admin', Admin_Routes_1.default);
app.use(error_middlewares_1.defaultErrorHandler);
