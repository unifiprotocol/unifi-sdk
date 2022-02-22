import React from "react";
import styled from "styled-components";
import { mediaQueries } from "@unifiprotocol/uikit";
import { useBalances } from "../../Balances";

const UnfiPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin-top: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.primary};

  ${mediaQueries.sm} {
    padding: 1rem;
  }

  ${mediaQueries.lg} {
    padding: 0.5rem;
  }

  img {
    width: 2rem;
    height: auto;
    margin-right: 0.5rem;
  }
`;

export const UnfiPrice = () => {
  const { unfiPrice } = useBalances();

  return (
    <UnfiPriceWrapper>
      <img
        src="https://proxy.unifiprotocol.com/ipfs/QmevrDWQFWZNX8JThb68fvsYvNxzF3nsx1ZEuNeWyGpE1p"
        alt="UNFI logo"
      />
      ${unfiPrice}
    </UnfiPriceWrapper>
  );
};
