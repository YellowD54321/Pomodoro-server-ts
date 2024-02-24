"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importStar(require("./middlewares/auth"));
const durationRoutes_1 = __importDefault(require("./routes/durationRoutes"));
const analysisRoutes_1 = __importDefault(require("./routes/analysisRoutes"));
const postRoutes_1 = require("./routes/postRoutes");
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const ws_1 = require("ws");
const constants_1 = require("./constants");
const url_1 = require("url");
const NotificationServices = __importStar(require("./services/notificationServices"));
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
wss.on('connection', (ws, req) => {
    if (!req.url)
        return ws.close();
    const query = new url_1.URL(req.url, `http://localhost:${port}`).searchParams;
    const { access_token: accessToken } = JSON.parse(query.get('access_token') || '') || {};
    let userId;
    try {
        const user = (0, auth_1.getUerFromToken)(accessToken);
        userId = user.id;
    }
    catch (err) {
        return ws.close();
    }
    console.log('Client connected, user id = ', userId);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const unreadNotifications = yield NotificationServices.getNotifications({
            user_id: userId,
            isRead: false,
        });
        const data = {
            notifications: unreadNotifications,
        };
        ws.send(JSON.stringify(data));
    }), constants_1.NOTIFICATION_UPDATE_SECONDS);
    ws.on('message', (data) => {
        const text = data.toString();
        console.log('#### text', text);
    });
    ws.on('close', () => {
        console.log('Connection closed');
    });
});
