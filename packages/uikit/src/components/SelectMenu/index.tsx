import React, { useMemo } from "react";
import Select, { Props } from "react-select";
import styled, { useTheme } from "styled-components";

const SelectLabel = styled.span`
  font-size: 95%;
  opacity: 0.5;
  color: ${(p) => p.theme.txt200};
  position: absolute;
  top: 0.2rem;
  left: 0.5rem;
  cursor: pointer;
  z-index: 0;
`;
const SelectMenuWrapper = styled.div`
  position: relative;
  background: ${(p) => p.theme.bg100};
`;
export const SelectMenu: React.FC<Props> = ({ label, ...props }) => {
  const theme = useTheme();
  const customStyles: Select["props"]["styles"] = useMemo(
    () => ({
      indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        ":hover": {
          color: theme.primary,
        },
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#000" : "#fff",
        backgroundColor: state.isSelected ? theme.primary : theme.bg100,
        fontWeight: "normal",
        cursor: "pointer",
        ":active": {
          backgroundColor: theme.bg100,
          color: "#000",
        },
      }),
      control: (provided, state) => ({
        ...provided,
        background: "transparent",
        cursor: "pointer",
        borderWidth: "2px",
        borderColor: state.isFocused ? theme.primary : theme.bg100,
        boxShadow: "0",
        fontWeight: "normal",
        ":hover": {
          borderColor: theme.primary,
        },
        padding: "1rem 0 0.3rem 0",
      }),
      container: (provided) => ({
        ...provided,
        width: "100%",
        zIndex: 2,
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "#fff",
      }),
      menu: (provided) => ({
        ...provided,
        background: theme.bg200,
      }),
    }),
    [theme]
  );
  return (
    <SelectMenuWrapper>
      <SelectLabel>{label}</SelectLabel>
      <Select {...props} styles={customStyles} />
    </SelectMenuWrapper>
  );
};
