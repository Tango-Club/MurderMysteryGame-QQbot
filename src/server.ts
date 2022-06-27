import {BotConfig as DefaultConfig} from "./config";
import {llog, lerror} from "./logger";
import {
    AvailableIntentsEventsEnum,
    createOpenAPI,
    createWebsocket,
} from "qq-guild-bot";

export let Config = new DefaultConfig();
console.log(Config);

const loadConfig = async function () {
    try {
        const customConfigPath = "./config.dev";
        const CustomConfig = await import(customConfigPath);
        Config = new CustomConfig.Config();
        llog("load custom config");
    } catch (e) {
        llog("no custom config");
    }
};

const runMain = async () => {
    await loadConfig();
    llog(Config.appID, Config.token);

    // 创建 client
    const client = createOpenAPI(Config);

    // 创建 websocket 连接
    const ws = createWebsocket(Config);

    // 消息监听
    ws.on("READY", (wsdata) => {
        console.log("[READY] 事件接收 :", wsdata);
    });
    ws.on("ERROR", (data) => {
        console.log("[ERROR] 事件接收 :", data);
    });
    ws.on("GUILDS", (data) => {
        console.log("[GUILDS] 事件接收 :", data);
    });
    ws.on("GUILD_MEMBERS", (data) => {
        console.log("[GUILD_MEMBERS] 事件接收 :", data);
    });
    ws.on("GUILD_MESSAGES", (data) => {
        console.log("[GUILD_MESSAGES] 事件接收 :", data);
    });
    ws.on("GUILD_MESSAGE_REACTIONS", (data) => {
        console.log("[GUILD_MESSAGE_REACTIONS] 事件接收 :", data);
    });
    ws.on("DIRECT_MESSAGE", (data) => {
        console.log("[DIRECT_MESSAGE] 事件接收 :", data);
    });
    ws.on("INTERACTION", (data) => {
        console.log("[INTERACTION] 事件接收 :", data);
    });
    ws.on("MESSAGE_AUDIT", (data) => {
        console.log("[MESSAGE_AUDIT] 事件接收 :", data);
    });
    ws.on("FORUMS_EVENT", (data) => {
        console.log("[FORUMS_EVENT] 事件接收 :", data);
    });
    ws.on("AUDIO_ACTION", (data) => {
        console.log("[AUDIO_ACTION] 事件接收 :", data);
    });
    ws.on("PUBLIC_GUILD_MESSAGES", (data) => {
        console.log("[PUBLIC_GUILD_MESSAGES] 事件接收 :", data);
    });
};
runMain();
