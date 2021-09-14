import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import styled from "styled-components";

const TokenOfficialBadgeWrapper = styled.span`
  display: inline !important;
  svg {
    vertical-align: middle;
    color: ${(p) => p.theme.primary};
  }
`;

export const TokenOfficialBadge: React.FC = () => (
  <TokenOfficialBadgeWrapper>
    <MdVerifiedUser size={13} />
  </TokenOfficialBadgeWrapper>
);
