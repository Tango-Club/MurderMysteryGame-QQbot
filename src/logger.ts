import fs from "fs";
import winston, { format } from "winston";
import { inspect } from "util";

const filterDevice = format.combine(
  format((info) => (info.device ? false : info))(),
  format.printf((info) => {
    const time = new Date().toLocaleString();
    return `${time} [${info.label}] ${info.level}: ${info.message}`;
  })
);
export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: filterDevice }),
    new winston.transports.File({
      format: filterDevice,
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      format: filterDevice,
      filename: "logs/combined.log",
    }),
    new winston.transports.File({
      filename: "logs/device.log",
      format: format.combine(
        format((info) => (!info.device ? false : info))(),
        format.printf((info) => {
          return `${info.device}: ${info.message}`;
        })
      ),
    }),
  ],
});

export const makeLabelLogger = (label: string) => {
  const convertArgs = (args: any[]) => {
    const cargs = args.map((v) => {
      if (typeof v == "string") return v;
      if (typeof v == "number") return v;
      return inspect(v);
    });
    return cargs;
  };
  const llog = (...args: any[]) => {
    const cargs = convertArgs(args);
    const str = cargs.join(", ");
    logger.info(str, { label });
  };
  const lerror = (...args: any[]) => {
    const cargs = convertArgs(args);
    const str = cargs.join(", ");
    logger.error(str, { label });
  };
  return { llog, lerror };
};

// 测试时不要输出到console，干扰
// 也不用winston，写文件无法禁用缓存，观察不及时
if (process.env.NODE_ENV == "test") {
  let ll = logger as any;
  let filename = "logs/test.log";
  ll.info = ll.error = function (str: any, info: { label: any }) {
    // console.log('-->', str, info);
    fs.open(filename, "a+", (err, fd) => {
      // Write our data
      const time = new Date().toLocaleString();
      let data = `${time} [${info.label}] : ${str}\n`;
      fs.writeFile(fd, data, (err) => {
        // Force the file to be flushed
        fs.fdatasync(fd, () => {
          //
        });
      });
    });
  };
}

export const { llog, lerror } = makeLabelLogger("bot");
llog("************************");
llog(`*** start pid: ${process.pid} ***`);
llog("************************");
llog(`*** cwd: ${process.cwd()}`);
// process.exit(1);
