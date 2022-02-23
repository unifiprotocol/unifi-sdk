import React from "react";
import styled from "styled-components";
import {
  BrandedHeader,
  AiOutlineMenu as OpenSidebarIcon,
  AiOutlineMenuFold as CloseSidebarIcon,
} from "@unifiprotocol/uikit";
import { BlockchainAction } from "../BlockchainAction";
import { ConnectionAction } from "../ConnectionAction";
import { useNavigation } from "../../Navigation";
import { LanguageAction } from "../LanguageAction";
import { LeftMenuWrapper } from "./Styles";

const TopHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > * {
    margin-left: 1rem;
  }
`;

export const TopHeader = () => {
  const { sidebarOpen, changeSidebarState } = useNavigation();

  const LeftMenu = () => (
    <LeftMenuWrapper
      onClick={() => changeSidebarState(!sidebarOpen)}
      // sidebarOpened={sidebarOpen}
    >
      {sidebarOpen && <CloseSidebarIcon size={25} />}
      {!sidebarOpen && <OpenSidebarIcon size={25} />}
    </LeftMenuWrapper>
  );

  return (
    <BrandedHeader leftControls={LeftMenu}>
      <TopHeaderWrapper>
        <LanguageAction />
        <BlockchainAction />
        <ConnectionAction />
      </TopHeaderWrapper>
    </BrandedHeader>
  );
};
