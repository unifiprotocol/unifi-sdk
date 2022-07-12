import { OpenSearchTransport } from "../../lib/Logger/Winston/Transports/OpenSearchTransport";
import { WinstonLogger } from "../../lib/Logger/Winston/WinstonLogger";

interface LoggerContext {
  blockchain?: string;
}

class Logger extends WinstonLogger<LoggerContext> {
  constructor() {
    super({
      transports: new OpenSearchTransport({
        indexName: "logs",
        openSearchNode: `${process.env.openSearchNode}`,
      }),
      defaultMeta: {
        app: "sample-1",
        id: "id-1",
      },
    });
  }
}

(async () => {
  const logger = new Logger();

  let i = 1000;
  while (i-- > 0) {
    logger.log({
      message: `Successful log ${i}`,
      type: "log.success",
      context: { blockchain: "titochain" },
    });
  }
})();
