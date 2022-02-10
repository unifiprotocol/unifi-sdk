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
