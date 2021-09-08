import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const PrimaryButton = styled(BaseButton)`
  background-color: ${(p) => (p.variant === 'outline' ? 'transparent' : p.theme.primary)};
  border-color: ${(p) => (p.variant === 'outline' ? p.theme.primary : 'transparent')};

  &,
  svg {
    color: ${(p) => (p.variant === 'outline' ? p.theme.primary : '#000')};
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    border-color: ${(p) => (p.variant === 'outline' ? p.theme.primaryDark : 'transparent')};

    color: #000;
    svg {
      color: #000;
    }
  }
  &:disabled:hover {
    background-color: ${(p) => (p.variant === 'outline' ? 'transparent' : p.theme.primaryLight)};
    color: ${(p) => (p.variant === 'outline' ? p.theme.primaryLight : '#000')};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${(p) => (p.variant === 'outline' ? 'transparent' : p.theme.bg2)};
  border-color: ${(p) => (p.variant === 'outline' ? p.theme.bg2 : 'transparent')};

  &:hover {
    background-color: ${(p) => p.theme.bg2};
    border-color: ${(p) => (p.variant === 'outline' ? p.theme.bg2 : 'transparent')};
  }
`;

export const DangerButton = styled(BaseButton)`
  color: #fff;
  background-color: ${(props) => props.theme.dangerColor};
  svg {
    color: #fff;
  }
`;
