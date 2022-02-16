import React, { useEffect } from "react";
import { useNotifications } from "@unifiprotocol/uikit";
import { ShellEventBus } from "../..";
import {
  ShowNotification,
  ShowNotificationEvent,
} from "../../EventBus/Events/NotificationEvents";

export const Notifications = () => {
  const { notify } = useNotifications();

  useEffect(() => {
    const fn = (event: ShowNotification) => notify(event.payload);
    ShellEventBus.on(ShowNotificationEvent, fn);
    return () => {
      ShellEventBus.off(ShowNotificationEvent, fn);
    };
  }, [notify]);

  return <></>;
};
