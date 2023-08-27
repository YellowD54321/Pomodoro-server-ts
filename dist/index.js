"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const durationRoutes_1 = __importDefault(require("./routes/durationRoutes"));
const analysisRoutes_1 = __importDefault(require("./routes/analysisRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/v1/user", userRoutes_1.default);
app.use(auth_1.default);
app.use("/v1/durations", durationRoutes_1.default);
app.use("/v1/analysis", analysisRoutes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
