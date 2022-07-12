import { v4 } from "uuid";
import { Client } from "@opensearch-project/opensearch";
import TransportStream, { TransportStreamOptions } from "winston-transport";
import { Optional } from "utility-types";

export interface OpenSearchTransportOptions extends TransportStreamOptions {
  indexName: string;
  openSearchNode: string;
  bulkMode: boolean;
  bulkSize: number;
  bulkInterval: number;
}

type ConstructorOptions = Optional<
  OpenSearchTransportOptions,
  "bulkMode" | "bulkSize" | "bulkInterval"
>;

type BulkItemTuple = [string, any]; // id, info

const defaultOptions = {
  bulkInterval: 5000,
  bulkMode: true,
  bulkSize: 10_000,
};

export class OpenSearchTransport extends TransportStream {
  private client: Client;
  private bulk: BulkItemTuple[] = [];
  private bulkTimeout: NodeJS.Timeout | undefined;
  private options: OpenSearchTransportOptions;
  constructor(options: ConstructorOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
    this.client = new Client({
      node: options.openSearchNode,
    });
    this.setBulkInterval();
  }

  private addToBulk(id: string, body: any) {
    this.bulk.push([id, body]);
    if (this.bulk.length >= this.options.bulkSize) {
      this.sendBulk();
    }
  }
  private clearBulkInterval() {
    clearTimeout(this.bulkTimeout);
    this.bulkTimeout = undefined;
  }
  private setBulkInterval() {
    this.clearBulkInterval();
    this.bulkTimeout = setTimeout(
      this.sendBulk.bind(this),
      this.options.bulkInterval
    );
  }
  private async sendBulk() {
    if (this.bulk.length > 0) {
      const body = this.bulk.map(
        ([id, info]) =>
          `{ "create": { "_index": "${
            this.options.indexName
          }", "_id": "${id}" } }\n${JSON.stringify(info)}`
      );
      // todo: consider ensuring publication
      this.bulk = [];
      this.clearBulkInterval();
      await this.client
        .bulk({ body: `${body.join(`\n`)}\n` })
        .catch((error) => {
          this.emit("error", error);
        });
    }
    this.setBulkInterval();
  }

  log(info: any, callback: any): void {
    setImmediate(() => {
      this.emit("logged", info);
    });
    const id = v4();
    if (this.options.bulkMode) {
      this.addToBulk(id, info);
      if (callback) {
        callback();
      }
      return;
    }
    this.client
      .index({
        id: v4(),
        index: this.options.indexName,
        body: info,
        refresh: false,
      })
      .then((res) => {
        if (res && res.statusCode !== 200) {
          this.emit(
            "warn",
            new Error(`Invalid HTTP Status Code: ${res.statusCode}`)
          );
        }

        if (callback) {
          callback();
        }
      });
  }

  /**
   * Query the transport. Options object is optional.
   * @param {Object} options -  Loggly-like query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * @returns {undefined}
   */
  query(options: any, callback: any): any {
    this.client
      .search({
        index: options.index_name,
        body: options.query,
      })
      .then(({ body, statusCode }) => {
        if (statusCode !== 200) {
          callback(new Error(`Invalid HTTP Status Code: ${statusCode}`));
        }

        if (typeof body === "string") {
          try {
            callback(JSON.parse(body));
          } catch (e) {
            return callback(e);
          }
        }
      });
  }

  /**
   * Returns a log stream for this transport. Options object is optional.
   * @param {Object} options - Stream options for this instance.
   * @returns {Stream} - TODO: add return description
   */
  stream(options = {}) {
    console.log("stream", options);
  }
}
