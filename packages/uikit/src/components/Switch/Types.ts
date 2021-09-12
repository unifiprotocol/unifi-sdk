import { IconType } from "react-icons/lib";

export interface SwitchProps {
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
