import styled from "styled-components";
import React from "react";
import { Properties } from 'csstype'

export type Placement = 
'right' | 'right-start' | 'right-end'
| 'bottom' | 'bottom-start' | 'bottom-end' 
| 'top-start' | 'top-end' | 'top'
| 'left' | 'left-start' | 'left-end';

type ArrowStyles = { width?: string, color?: string }

 type TooltipStyles = { tooltip?: any, arrow: ArrowStyles }

export type TooltipProps = {event?: 'onClick' | 'onHover', content?: React.ReactNode, styles?: TooltipStyles, placement?: Placement, arrowWidth ?: string, arrow?: boolean };

type TooltipBodyProps  = { customStyles?: Object, arrow : ArrowStyles };

const TopTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
bottom: calc(100% + ${({arrow}) => arrow?.width || "2px"});
left: 50%;
transform: translateX(-50%);
max-width: max-content;
max-height: max-content;
&:before {
  content: "";
  width: 0;
  height: 0;
  left: 0;
  right: 0;
  margin: auto;
  bottom: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const TopStartTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
bottom: calc(100% + ${({arrow}) => arrow?.width || "2px"});
left: 0%;
&:before {
  content: "";
  width: 0;
  height: 0;
  left: calc(5% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  bottom: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const TopEndTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
bottom: calc(100% + ${({arrow}) => arrow?.width || "2px"});
right: 0%;
&:before {
  content: "";
  width: 0;
  height: 0;
  right: calc(5% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  bottom: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const BottomTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: calc(100% + ${({arrow}) => arrow?.width || "2px"});
left: 50%;
transform: translateX(-50%);
max-width: max-content;
max-height: max-content;
&:before {
  content: "";
  width: 0;
  height: 0;
  left: 0;
  right: 0;
  margin: auto;
  top: -${({arrow}) => arrow?.width || "2px"};
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const BottomStartTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: calc(100% + ${({arrow}) => arrow?.width || "2px"});
left: 0;
&:before {
  content: "";
  width: 0;
  height: 0;
  left: calc(5% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  top: -${({arrow}) => arrow?.width || "2px"};
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const BottomEndTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: calc(100% + ${({arrow}) => arrow?.width || "2px"});
right: 0;
&:before {
  content: "";
  width: 0;
  height: 0;
  right: calc(5% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  top: -${({arrow}) => arrow?.width || "2px"};
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const LeftTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: 50%;
right: calc(100% + ${({arrow}) => arrow?.width || "2px"});
transform: translateY(calc(-50%));
&:before {
  content: "";
  width: 0;
  height: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  right: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const LeftStartTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
right: calc(100% + ${({arrow}) => arrow?.width || "2px"});
top: 0;
&:before {
  content: "";
  width: 0;
  height: 0;
  top: calc(2% + ${({arrow}) => arrow?.width || "2px"});
  right: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const LeftEndTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
right: calc(100% + ${({arrow}) => arrow?.width || "2px"});
bottom: 0;
&:before {
  content: "";
  width: 0;
  height: 0;
  bottom: calc(2% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  right: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const RightTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: 50%;
left: calc(100% + ${({arrow}) => arrow?.width || "2px"});
transform: translateY(-50%);
&:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top:0;
  bottom:0;
  margin: auto;
  left: calc(-${({arrow}) => arrow?.width || "2px"});
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const RightStartTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
top: 0%;
left: calc(100% + ${({arrow}) => arrow?.width || "2px"});
&:before {
  content: "";
  width: 0;
  height: 0;
  margin: auto;
  top: calc(2% + ${({arrow}) => arrow?.width || "2px"});
  left: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

const RightEndTooltipBody = styled.div<TooltipBodyProps>`
position: absolute;
bottom: 0%;
left: calc(100% + ${({arrow}) => arrow?.width || "2px"});
&:before {
  content: "";
  width: 0;
  height: 0;
  bottom: calc(2% + ${({arrow}) => arrow?.width || "2px"});
  margin: auto;
  left: calc(-${({arrow}) => arrow?.width || "2px"});
  position: absolute;
  border: ${({arrow}) => arrow?.width || "2px"} solid transparent;
  transform: rotate(135deg);
  transition: border 0.4s ease-in-out;
  background: ${({arrow}) => arrow?.color || 'transparent'};
  ${({arrow}) => {
    const {color, width, ...props} = arrow;
    return Object.entries(props).map(ent => `${ent[0]}:${ent[1]}`).join(';') + ';';
  }}
}
`;

export const getTooltipBodyByPlacement = (placement : string, tooltipAttributes: {style : Properties, content : React.ReactNode, arrow : ArrowStyles }) => {
    const {content, ...props} = tooltipAttributes;
    switch (placement) {
        case "top": return <TopTooltipBody {...props}>{content}</TopTooltipBody>
        case "top-start": return <TopStartTooltipBody {...props}>{content}</TopStartTooltipBody>
        case "top-end": return <TopEndTooltipBody {...props}>{content}</TopEndTooltipBody>
        case "bottom": return <BottomTooltipBody {...props}>{content}</BottomTooltipBody>
        case "bottom-start": return <BottomStartTooltipBody {...props}>{content}</BottomStartTooltipBody>
        case "bottom-end": return <BottomEndTooltipBody {...props}>{content}</BottomEndTooltipBody>
        case "right": return <RightTooltipBody {...props}>{content}</RightTooltipBody>
        case "right-start": return <RightStartTooltipBody {...props}>{content}</RightStartTooltipBody>
        case "right-end": return <RightEndTooltipBody {...props}>{content}</RightEndTooltipBody>
        case "left": return <LeftTooltipBody {...props}>{content}</LeftTooltipBody>
        case "left-start": return <LeftStartTooltipBody {...props}>{content}</LeftStartTooltipBody>
        case "left-end": return <LeftEndTooltipBody {...props}>{content}</LeftEndTooltipBody>
    }
    throw new Error('Wrong placement value, must be: top, bottom, left or right');
}