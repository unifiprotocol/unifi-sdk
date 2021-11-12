import React from "react";
import styled from "styled-components";
import { UnifiLogoTextLight } from "../../assets/logos";

const BrandedHeaderWrapper = styled.div`
  z-index: 999999;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.bgAlt};
  height: 3.5rem;
  overflow: hidden;
  width: 100%;
`;

const BrandedHeaderContent = styled.div`
  padding: 0.7rem 2rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative; // for the children 😉

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0.7rem 0.7rem;
  }
`;

const BrandedHeaderLogo = styled.img`
  height: 1.8rem;
  width: auto;
`;

export const BrandedHeader: React.FC<{
  leftControls?: React.FC;
}> = ({ children, leftControls: LeftControls }) => (
  <BrandedHeaderWrapper>
    <BrandedHeaderContent>
      {LeftControls && <LeftControls />}
      <BrandedHeaderLogo src={UnifiLogoTextLight} />
      {children}
    </BrandedHeaderContent>
  </BrandedHeaderWrapper>
);
