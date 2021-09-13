import React from "react";
import styled, { css } from "styled-components";
import UnifiTextLogo from "../../assets/UnifiLogoText.svg";
import { Themed } from "../../themes/types";

const BrandedHeaderWrapper = styled.div<Themed & { fixed: boolean }>`
  z-index: 999999;

  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    `}

  display: flex;
  align-items: center;
  background: ${(props) => props.theme.bg200};
  height: 3.5rem;
  overflow: hidden;
`;

const BrandedHeaderContent = styled.div`
  padding: 0.7rem 2rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  position: relative; // for the children 😉
`;

const BrandedHeaderLogo = styled.img`
  height: 1.8rem;
  width: auto;
`;

export const BrandedHeader: React.FC<{ fixed?: boolean }> = ({
  children,
  fixed = false,
}) => (
  <BrandedHeaderWrapper fixed={fixed}>
    <BrandedHeaderContent>
      <BrandedHeaderLogo src={UnifiTextLogo} />
      {children}
    </BrandedHeaderContent>
  </BrandedHeaderWrapper>
);
