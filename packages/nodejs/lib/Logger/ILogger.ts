export interface LogEntry<ContextType extends Record<string, any>> {
  message: string;
  level: "info" | "debug" | "warn" | "error";
  type: string;
  time: Date;
  success?: boolean;
  error?: any;
  context?: ContextType;
}

export type ErrorLogEntry<ContextType> = LogEntryParams<ContextType> &
  Required<Pick<LogEntryParams<ContextType>, "error">>;

export type LogEntryParams<ContextType> = Omit<
  LogEntry<ContextType>,
  "level" | "time"
>;

export interface ILogger<ContextType> {
  log(entry: LogEntryParams<ContextType>): void;
  debug(entry: LogEntryParams<ContextType>): void;
  warn(entry: LogEntryParams<ContextType>): void;
  error(entry: ErrorLogEntry<ContextType>): void;
}
