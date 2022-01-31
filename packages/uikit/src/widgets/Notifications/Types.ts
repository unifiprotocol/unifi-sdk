import { ToasterProps } from "react-hot-toast";

export type NotificationAppearance = "success" | "info" | "warning" | "error";
export type NotificationPosition = ToasterProps["position"];

export interface Notification {
  content: string | JSX.Element;
  appearance: NotificationAppearance;
  position?: NotificationPosition;
  duration?: number;
  disableAutoClose?: boolean;
  onClose?: () => void;
}
