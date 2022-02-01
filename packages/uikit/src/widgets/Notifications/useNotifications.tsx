import React from "react";
import { ToastNotification } from "../../components/Notifications";
import { useCallback } from "react";
import toastr, { ToasterProps } from "react-hot-toast";

import { Notification } from "./Types";

type UseNotificationHook = () => {
  notify: (notification: Notification) => void;
};

export const useNotifications: UseNotificationHook = () => {
  const notify = useCallback((notification: Notification) => {
    const toastrOptions: ToasterProps["toastOptions"] = {
      position: notification.position,
      duration: notification.disableAutoClose
        ? Infinity
        : notification.duration,
    };

    toastr.custom((t) => {
      const onDismiss = () => {
        if (notification.onClose) {
          notification.onClose();
        }
        toastr.dismiss(t.id);
      };

      return (
        <ToastNotification
          autoDismissTimeout={notification.disableAutoClose ? 0 : t.duration}
          appearance={notification.appearance}
          animation={t.visible ? "enter" : "leave"}
          onDismiss={onDismiss}
        >
          {notification.content}
        </ToastNotification>
      );
    }, toastrOptions);
  }, []);

  return {
    notify,
  };
};
