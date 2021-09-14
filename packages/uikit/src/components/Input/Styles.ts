import styled from "styled-components";
import { Themed } from "../../themes/types";

export const InputWrapper = styled.div<Themed>`
  display: flex;
  align-items: center;
  background: ${(p) => p.theme.bg200};
  border-radius: ${(p) => p.theme.borderRadius};

  padding: 0.6rem;
  height: 3rem;
  transition: 0.25s all;
  gap: 0.5rem;
`;

export const IconAddon = styled.span`
  svg {
    vertical-align: middle;
  }
`;

export const InputBox = styled.input<Themed>`
  outline: none;
  background: transparent;
  color: ${(p) => p.theme.txt100};
  border-radius: ${(p) => p.theme.borderRadius};
  border: none;
  font-size: 1rem;
  color: ${(p) => p.theme.txt100};
  width: 100%;
`;
export const InputPrefix = styled.div``;

export const Actions = styled.div``;
export const ActionButton = styled.button`
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(p) => p.theme.txt200};
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.bg300};
  border: 2px solid transparent;
  transition: 0.2s all;
  font-weight: 300;
  padding: 0.3rem;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }
`;