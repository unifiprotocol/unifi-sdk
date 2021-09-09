import React from 'react';
import Select, { Props } from 'react-select';
import styled from 'styled-components';
// TODO: when having multiple themes this will need to change
import { DarkTheme } from '../../Theming';

const customStyles: Select['props']['styles'] = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    ':hover': {
      color: DarkTheme.primary,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000' : '#fff',
    backgroundColor: state.isSelected ? DarkTheme.primary : DarkTheme.bg0,
    fontWeight: 'normal',
    cursor: 'pointer',
    ':active': {
      backgroundColor: DarkTheme.bg0,
      color: '#000',
    },
  }),
  control: (provided, state) => ({
    ...provided,
    background: 'transparent',
    cursor: 'pointer',
    borderWidth: '2px',
    borderColor: state.isFocused ? DarkTheme.primary : DarkTheme.bg0,
    boxShadow: '0',
    fontWeight: 'normal',
    ':hover': {
      borderColor: DarkTheme.primary,
    },
    padding: '1rem 0 0.3rem 0',
  }),
  container: (provided) => ({
    ...provided,
    width: '100%',
    zIndex: 2,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    background: DarkTheme.bg1,
  }),
};
const SelectLabel = styled.span`
  font-size: 95%;
  opacity: 0.5;
  color: ${(p) => p.theme.txt1};
  position: absolute;
  top: 0.2rem;
  left: 0.5rem;
  cursor: pointer;
  z-index: 0;
`;
const SelectMenuWrapper = styled.div`
  position: relative;
  background: ${(p) => p.bg0};
`;
export const SelectMenu: React.FC<Props> = ({ label, ...props }) => {
  return (
    <SelectMenuWrapper>
      <SelectLabel>{label}</SelectLabel>
      <Select {...props} styles={customStyles} />
    </SelectMenuWrapper>
  );
};
