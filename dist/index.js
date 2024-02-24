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
const postRoutes_1 = require("./routes/postRoutes");
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const ws_1 = require("ws");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: '',
    });
});
app.use('/v1/user', userRoutes_1.default);
app.use('/v1/posts', postRoutes_1.PostsRouter);
app.use(auth_1.default);
app.use('/v1/durations', durationRoutes_1.default);
app.use('/v1/analysis', analysisRoutes_1.default);
app.use('/v1/post', postRoutes_1.PostRouter);
app.use('/v1/notification', notificationRoutes_1.default);
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('123');
    ws.on('message', (data) => {
        const text = data.toString();
        console.log('#### text', text);
    });
    ws.on('close', () => {
        console.log('Connection closed');
    });
});
