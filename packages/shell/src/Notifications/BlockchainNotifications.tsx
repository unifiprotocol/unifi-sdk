import {
  Notification,
  NotificationAppearance,
  Themes,
} from "@unifiprotocol/uikit";
import { Trans } from "react-i18next";

export class WrongNetworkNotification implements Notification {
  appearance: NotificationAppearance = "error";
  constructor(public network: string) {}

  get content(): string | JSX.Element {
    return (
      <Trans
        i18nKey="notifications.wrong_network"
        values={{ network: this.network, color: Themes.Dark.danger }}
        components={{ b: <b /> }}
      />
    );
  }
}
