import winston from "winston";
import { OpenSearchTransport, WinstonLogger } from "../../lib";

interface LoggerContext {
  blockchain?: string;
}

const openSearchTransport = new OpenSearchTransport({
  indexName: "logs",
  openSearchNode: `${process.env.openSearchNode}`,
});
class Logger extends WinstonLogger<LoggerContext> {
  constructor() {
    super({
      transports: [new winston.transports.Console(), openSearchTransport],
      defaultMeta: {
        app: "sample-1",
        id: "id-1",
      },
    });
  }
}

(async () => {
  const logger = new Logger();

  let i = 100000;
  while (i-- > 0) {
    await sleep(500);
    logger.log({
      message: `Successful log ${i}`,
      type: "log.success",
      context: { blockchain: "titochain" },
    });
  }
})();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
