import { IAdapter } from "../../Adapters/IAdapter";
import { BaseConnector } from "../../Connectors/BaseConnector";

export abstract class OfflineConnector extends BaseConnector {
  abstract connect(): Promise<IAdapter>;
  async logout(): Promise<void> {}
}
