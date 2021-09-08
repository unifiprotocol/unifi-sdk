import styled from 'styled-components';

export const BaseButton = styled.button<{ block?: boolean }>`
  display: inline-block;
  margin: 0.25rem 0;
  font-size: 0.9rem;
  min-height: 2.3rem;
  color: #fff;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: center;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s;
  border: 2px solid transparent;

  &:disabled {
    opacity: 0.6;
  }

  &:disabled {
    cursor: default;
  }

  svg {
    transition: 0.25s all;
    color: #fff;
    vertical-align: middle;
    margin-right: 0.25rem;
  }
`;
