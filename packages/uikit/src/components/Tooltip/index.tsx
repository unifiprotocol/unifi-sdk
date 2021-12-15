import React from "react";
import styled from "styled-components";
import {
  getTooltipBodyByPlacement,
  TooltipProps,
} from "./TooltipBodyTemplates";

const TooltipWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  cursor: help;
  margin: 0;
  display: inline-block;
`;

const TooltipContentWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  event = "onHover",
  content = "",
  arrow = true,
  placement = "bottom",
  styles = { tooltip: {}, arrow: {} },
}) => {
  const [show, setShow] = React.useState(false);
  const wrapperProps =
    event === "onClick"
      ? {
          onClick: () => setShow(!show),
        }
      : {
          onMouseEnter: () => setShow(true),
          onMouseLeave: () => setShow(false),
        };
  const tooltipStyles = styles.tooltip || {};
  return (
    <TooltipWrapper>
      {show &&
        getTooltipBodyByPlacement(placement, {
          style: tooltipStyles,
          content: content,
          arrow: !arrow ? {} : styles.arrow,
        })}
      <TooltipContentWrapper {...wrapperProps}>
        {children}
      </TooltipContentWrapper>
    </TooltipWrapper>
  );
};
