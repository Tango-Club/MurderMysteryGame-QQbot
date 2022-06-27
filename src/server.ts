import { BotConfig as DefaultConfig } from "./config";
import { llog, lerror } from "./logger";
import {
  AvailableIntentsEventsEnum,
  createOpenAPI,
  createWebsocket,
} from "qq-guild-bot";
import fs from "fs";

export let Config = new DefaultConfig();
llog(Config);

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
  const fs = require("fs");
  const readFileLines = (filename) =>
    fs.readFileSync(filename).toString("UTF8").split("\n");
  let cnt = 0;
  let arr = readFileLines("./data/百年孤独.txt");
  await loadConfig();
  llog(Config.appID, Config.token);

  // 创建 client
  const client = createOpenAPI(Config);

  // 创建 websocket 连接
  const ws = createWebsocket(Config);

  // 消息监听
  ws.on("READY", (wsdata) => {
    llog("[READY] 事件接收 :", wsdata);
  });
  ws.on("ERROR", (data) => {
    llog("[ERROR] 事件接收 :", data);
  });
  ws.on("GUILDS", (data) => {
    llog("[GUILDS] 事件接收 :", data);
  });
  ws.on("GUILD_MEMBERS", (data) => {
    llog("[GUILD_MEMBERS] 事件接收 :", data);
  });
  ws.on("GUILD_MESSAGES", (data) => {
    llog("[GUILD_MESSAGES] 事件接收 :", data);
  });
  ws.on("GUILD_MESSAGE_REACTIONS", (data) => {
    llog("[GUILD_MESSAGE_REACTIONS] 事件接收 :", data);
  });
  ws.on("DIRECT_MESSAGE", (data) => {
    llog("[DIRECT_MESSAGE] 事件接收 :", data);
  });
  ws.on("INTERACTION", (data) => {
    llog("[INTERACTION] 事件接收 :", data);
  });
  ws.on("MESSAGE_AUDIT", (data) => {
    llog("[MESSAGE_AUDIT] 事件接收 :", data);
  });
  ws.on("FORUMS_EVENT", (data) => {
    llog("[FORUMS_EVENT] 事件接收 :", data);
  });
  ws.on("AUDIO_ACTION", (data) => {
    llog("[AUDIO_ACTION] 事件接收 :", data);
  });
  ws.on("PUBLIC_GUILD_MESSAGES", async (data) => {
    llog("[PUBLIC_GUILD_MESSAGES] 事件接收 :", data);
    if (data.msg.content.indexOf("/下一幕") != -1) {
      let msg = "";
      while (cnt < arr.length) {
        if (arr[cnt] == "\n" || arr[cnt] == "\r") {
          cnt++;
          break;
        }
        msg += arr[cnt];
        cnt++;
      }
      await client.messageApi.postMessage(data.msg.channel_id, {
        // msg_id: data.msg.id,
        content: msg,
      });
    } else {
      await client.messageApi.postMessage(data.msg.channel_id, {
        msg_id: data.msg.id,
        content: "<@!" + data.msg.author.id + ">" + " Hello!",
      });
    }
  });
};
runMain();
