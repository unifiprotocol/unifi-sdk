import styled from "styled-components";

export const TokenListWrapper = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  color: #fff;

  @media (${(props) => props.theme.breakpoints.xs}) {
    min-width: 100% !important;
    max-width: 100% !important;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    > svg {
      cursor: pointer;
    }
  }
`;
export const TokenSymbolAndBadges = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;
export const TokenBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const LoadingTokens = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 1rem;
  margin: 1rem;
`;

export const TokenListRowsWrapper = styled.div`
  margin-top: 0.5rem;
  min-height: 20rem;
  max-height: 20rem;
  overflow-y: scroll;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const TokenListRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.bg};
  }

  > div {
    display: flex;
    align-items: center;
    font-weight: 600;

    img {
      width: 2.7rem;
      height: 2.7rem;
      margin-right: 1rem;
    }
  }
`;
export const TokenLabel = styled.div`
  display: block;
  span {
    display: block;
  }
`;
export const TokenSymbol = styled.div`
  line-height: 1rem;
`;
export const TokenName = styled.div`
  line-height: 1rem;
  color: ${(p) => p.theme.txt200};
  font-size: 90%;
`;
export const TokenContract = styled.a`
  color: ${(p) => p.theme.txt200};
  font-size: 80%;
  text-decoration: underline;
`;
