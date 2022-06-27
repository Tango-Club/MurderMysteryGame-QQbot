import { AvailableIntentsEventsEnum } from "qq-guild-bot";

/*
以下配置为默认配置，不可使用。在本地请自建config.dev.ts重载之。
*/
export class BotConfig {
  constructor(
    appID?: string,
    token?: string,
    sandbox?: boolean,
    shards?: Array<number>,
    intents?: Array<AvailableIntentsEventsEnum>,
    maxRetry?: number
  ) {
    this.appID = appID ? appID : "appID";
    this.token = token ? token : "token";
    this.sandbox = sandbox ? sandbox : false;
    this.shards = shards;
    this.intents = intents
      ? intents
      : [AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES];
    this.maxRetry = maxRetry;
  }

  appID: string; //申请机器人时获取到的机器人
  token: string; //申请机器人时获取到的机器人
  sandbox: boolean; //沙箱支持，可选，默认false. v2.7.0+
  shards?: Array<number>;
  intents?: Array<AvailableIntentsEventsEnum>; //事件订阅,用于开启可接收的消息类型
  maxRetry?: number;
}
