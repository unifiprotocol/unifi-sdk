import { IconType } from "react-icons/lib";

export type SwitchVariant = "fill" | "outline" | "shiny";
export interface SwitchProps {
  variant?: SwitchVariant;
  selected: SwitchChoice["value"];
  choices: SwitchChoice[];
  disabled?: boolean;
  disabledCursor?: string;
  onChange: (value: string) => void;
  checkIcon?: IconType;
}
export interface SwitchChoice {
  value: string;
  label: string;
}
