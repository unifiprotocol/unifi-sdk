import winston from "winston";
import * as Transport from "winston-transport";

import { ErrorLogEntry, ILogger, LogEntry, LogEntryParams } from "../ILogger";

export interface WinstonLoggerOptions {
  transports?: Transport | Transport[];
  defaultMeta: {
    app: string;
    id: string;
  };
}

export class WinstonLogger<ContextType> implements ILogger<ContextType> {
  logger: winston.Logger;
  constructor({ defaultMeta, transports }: WinstonLoggerOptions) {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: {
        ...defaultMeta,
      },
      transports: transports || new winston.transports.Console(),
    });
  }

  log(entry: LogEntryParams<ContextType>): void {
    this.logger.info(
      this.prepareEntry(
        {
          success: true,
          ...entry,
        },
        { level: "info" }
      )
    );
  }
  debug(entry: LogEntryParams<ContextType>): void {
    this.logger.debug(
      this.prepareEntry(
        {
          success: true,
          ...entry,
        },
        { level: "debug" }
      )
    );
  }
  warn(entry: LogEntryParams<ContextType>): void {
    this.logger.warn(
      this.prepareEntry(
        {
          success: true,
          ...entry,
        },
        { level: "warn" }
      )
    );
  }

  error(entry: ErrorLogEntry<ContextType>): void {
    this.logger.error(
      this.prepareEntry(
        {
          success: false,
          ...entry,
        },
        { level: "error" }
      )
    );
  }

  private prepareEntry(
    entryParams: LogEntryParams<ContextType>,
    { level }: Pick<LogEntry<ContextType>, "level">
  ): LogEntry<ContextType> {
    const entry: LogEntry<ContextType> = {
      ...entryParams,
      time: new Date(),
      level: level,
    };
    if (entry.error) {
      entry.error = this.normalizeEntryError(entry.error);
    }

    return entry;
  }

  private normalizeEntryError(error: any) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return error;
  }
}

export const Logger = new WinstonLogger({
  defaultMeta: {
    app: "SampleApp",
    id: "SampleApp-1",
  },
});
