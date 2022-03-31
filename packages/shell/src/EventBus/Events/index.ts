import { AddCurrency, RefreshBalances, Wipe } from "./BalancesEvents";
import {
  AdapterConnected,
  AddressChanged,
  NetworkChanged,
} from "./AdapterEvents";
import { ShowNotification } from "./NotificationEvents";
import { OpenNetworkModal } from "./UIEvents";
import { ChangeNetwork } from "./BlockchainEvents";

export const ShellEvents = {
  Balances: { AddCurrency, RefreshBalances, Wipe },
  Adapter: { AdapterConnected, AddressChanged, NetworkChanged },
  Notifications: { ShowNotification },
  UI: { OpenNetworkModal },
  Blockchain: { OpenNetworkModal, ChangeNetwork },
};
