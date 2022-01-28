import React from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

export interface NotificationsProviderProps {
  position?: ToasterProps["position"];
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  position = "top-right",
}) => {
  return <Toaster position={position} />;
};
