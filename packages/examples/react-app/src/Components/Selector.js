import { useCallback } from "react";
import { Select, MenuItem } from "@material-ui/core";

export const Selector = ({ options, onChange, value = "", placeholder }) => {
  const handleChange = useCallback(
    (evt) => {
      onChange(evt.target.value);
    },
    [onChange]
  );
  return (
    <Select
      fullWidth={true}
      value={value}
      placeholder={placeholder}
      displayEmpty
      onChange={handleChange}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
