import React from 'react';
import styled from 'styled-components';
import UnifiTextLogo from '../../assets/UnifiLogoText.svg';

const BrandedHeaderWrapper = styled.div`
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  background: ${(props) => props.theme.bg0};
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

export const BrandedHeader: React.FC = ({ children }) => (
  <BrandedHeaderWrapper>
    <BrandedHeaderContent>
      <BrandedHeaderLogo src={UnifiTextLogo} />
      {children}
    </BrandedHeaderContent>
  </BrandedHeaderWrapper>
);
