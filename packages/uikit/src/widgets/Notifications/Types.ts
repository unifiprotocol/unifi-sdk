export interface Notification {
  content: string | JSX.Element;
  appearance: "success" | "info" | "warning" | "error";
}
