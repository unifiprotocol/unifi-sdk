import styled from "styled-components";

export const WalletInfo = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.bg};
`;

export const WalletAction = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const WalletAddress = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.75rem;
`;

export const ConnectedWalletActions = styled.div`
  display: flex;
`;

export const ConnectedWalletAction = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  svg {
    margin-right: 0.25rem;
  }
`;
