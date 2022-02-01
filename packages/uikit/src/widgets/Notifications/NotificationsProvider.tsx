import React from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

export interface NotificationsProviderProps {
  defaultPosition?: ToasterProps["position"];
  defaultDuration?: number;
  disableAutoClose?: boolean;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  defaultPosition = "top-right",
  defaultDuration = 4000,
  disableAutoClose = false,
}) => {
  return (
    <Toaster
      position={defaultPosition}
      toastOptions={{ duration: disableAutoClose ? Infinity : defaultDuration }}
    />
  );
};
