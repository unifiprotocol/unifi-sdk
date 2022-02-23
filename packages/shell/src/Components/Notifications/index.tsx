import React, { useEffect } from "react";
import { useNotifications } from "@unifiprotocol/uikit";
import {
  ShowNotification,
  ShowNotificationEvent,
} from "../../EventBus/Events/NotificationEvents";
import { ShellEventBus } from "../../EventBus";

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
