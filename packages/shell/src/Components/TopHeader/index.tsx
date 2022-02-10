import React from "react";
import styled from "styled-components";
import { BrandedHeader } from "@unifiprotocol/uikit";
import { BlockchainAction } from "../BlockchainAction";
import { ConnectionAction } from "../ConnectionAction";

const TopHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > * {
    margin-left: 1rem;
  }
`;

export const TopHeader = () => {
  return (
    <BrandedHeader>
      <TopHeaderWrapper>
        <BlockchainAction />
        <ConnectionAction />
      </TopHeaderWrapper>
    </BrandedHeader>
  );
};
