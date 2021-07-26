import styled from 'styled-components';

const BaseButton = styled.button<{ block?: boolean }>`
  display: inline-block;
  margin: 0.25rem 0;
  font-size: 0.9rem;
  min-height: 2.3rem;
  color: #fff;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.lightGrey};
  text-align: center;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s;
  border: 2px solid transparent;

  &:hover {
    opacity: 0.8;
  }
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
  }
`;

export const SecondaryButton = styled(BaseButton)``;

export const TertiaryButton = styled(BaseButton)`
  color: #fff;
  background-color: ${(props) => props.theme.lightestGrey};
`;

export const DangerButton = styled(BaseButton)`
  color: #fff;
  background-color: ${(props) => props.theme.dangerColor};
  svg {
    color: #fff;
  }
`;
export const PinkButton = styled(BaseButton)`
  color: #fff;
  background-color: ${(props) => props.theme.pink};
  svg {
    color: #fff;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: ${(p) => (p.variant === 'outline' ? 'transparent' : p.theme.primaryColor)};
  border-color: ${(p) => (p.variant === 'outline' ? p.theme.primaryColor : 'transparent')};
  color: ${(p) => (p.variant === 'outline' ? p.theme.primaryColor : '#000')};

  svg {
    color: ${(p) => (p.variant === 'outline' ? p.theme.primaryColor : 'rgba(0, 0, 0, 0.9)')};
  }
  &:hover {
    background-color: ${(props) => props.theme.lightGreen};
    color: #000;
    svg {
      transition: 0.25s all;
      color: #000;
    }
  }

  &:disabled:hover {
    background-color: ${(p) => (p.variant === 'outline' ? 'transparent' : p.theme.lightGreen)};

    color: ${(p) => (p.variant === 'outline' ? p.theme.lightGreen : '#000')};
  }
`;
