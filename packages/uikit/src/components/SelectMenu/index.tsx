import React, { useMemo } from "react";
import Select, { Props } from "react-select";
import styled, { useTheme } from "styled-components";
import { UnifiTheme } from "../../themes/types";

const SelectLabel = styled.span`
  font-size: 85%;
  color: ${(p) => p.theme.txt200};
  position: absolute;
  top: 0.1rem;
  left: 0.6rem;
  cursor: pointer;
  z-index: 0;
`;
const SelectMenuWrapper = styled.div`
  position: relative;
  height: ${(p) => p.theme.inputHeight};
  background: ${(p) => p.theme.bgInput};
`;
export const SelectMenu: React.FC<Props> = ({ label, ...props }) => {
  const theme = useTheme() as UnifiTheme;
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
        color: state.isDisabled
          ? theme.txtMuted
          : state.isSelected
          ? theme.primary
          : theme.txt100,
        backgroundColor:
          state.isDisabled || state.isSelected
            ? `${theme.bgAlt}!important`
            : theme.bgAlt,
        fontWeight: "normal",
        cursor: state.isDisabled ? "not-allowed" : "pointer",

        ":active": {
          backgroundColor: theme.bgAlt,
        },
        ":hover": {
          backgroundColor: theme.bg,
        },
      }),
      control: (provided, state) => ({
        ...provided,
        background: "transparent",
        cursor: "pointer",
        borderWidth: "2px",
        boxShadow: "0",
        fontWeight: "normal",
        borderColor: theme.bg,
        ":hover": {
          borderColor: theme.primary,
        },
        padding: "0.5rem 0 0 0",
      }),
      container: (provided) => ({
        ...provided,
        width: "100%",
        zIndex: 2,
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme.txt100,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: "0.4rem 0.4rem 0 0.4rem",
      }),
      menu: (provided) => ({
        ...provided,
        border: `2px solid ${theme.bg}`,
        background: theme.bg,
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
