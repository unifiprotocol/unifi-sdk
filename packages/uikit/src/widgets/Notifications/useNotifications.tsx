import React from "react";
import { ToastNotification } from "../../components/Notifications";
import { useCallback } from "react";
import toastr from "react-hot-toast";

import { Notification } from "./Types";

type UseNotificationHook = () => {
  notify: (notification: Notification) => void;
};

export const useNotifications: UseNotificationHook = () => {
  const notify = useCallback((notification: Notification) => {
    toastr.custom((t) => {
      const onDismiss = () => toastr.dismiss(t.id);
      return (
        <ToastNotification
          appearance={notification.appearance}
          onDismiss={onDismiss}
        >
          {notification.content}
        </ToastNotification>
      );
    });
  }, []);

  return {
    notify,
  };
};
