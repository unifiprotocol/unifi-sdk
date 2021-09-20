import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Card } from "../Card";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

const SHOW_DETAILS_DEFAULT = "show details";
const HIDE_DETAILS_DEFAULT = "hide details";

const CollapsibleCardWrapper = styled(Card)`
  margin: 0.5rem;
  max-width: 25rem;
  min-width: 25rem;
  padding: 0.5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    min-width: 100% !important;
    max-width: 100% !important;
  }
`;

const CollapsibleToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80%;
  padding: 0.25rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryLight};

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const CollapsibleArea = styled.div<{ active: boolean }>`
  background: ${(props) => props.theme.bgAlt2};
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius};
  display: none;

  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;

export const CollapsibleCard: React.FC<{
  details?: React.ReactNode;
  showDetailsLabel?: string;
  hideDetailsLabel?: string;
}> = ({
  children,
  details,
  showDetailsLabel = SHOW_DETAILS_DEFAULT,
  hideDetailsLabel = HIDE_DETAILS_DEFAULT,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <CollapsibleCardWrapper>
      {children}
      {details && (
        <>
          <CollapsibleToggle onClick={() => setCollapsed((st) => !st)}>
            {collapsed ? <CgChevronDown /> : <CgChevronUp />}
            {collapsed ? showDetailsLabel : hideDetailsLabel}
          </CollapsibleToggle>
          <CollapsibleArea active={!collapsed}>{details}</CollapsibleArea>
        </>
      )}
    </CollapsibleCardWrapper>
  );
};
