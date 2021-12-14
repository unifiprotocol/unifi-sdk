import styled from "styled-components";
import { Tooltip } from "./index";
import { Themes } from "../../themes";

export default {
  title: "Components/Tooltip",
};

const Wrapper = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const baseStyle = {
  fontFamily: Themes.Dark.fontFamily,
  fontSize: "1rem",
  border: "2px solid transparent",
};

const classes = {
  tooltip: {
    ...baseStyle,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    borderColor: "#fff",
    width: "30vw",
    maxWidth: "max-content",
    padding: "5%",
    borderRadius: "5px",
    zIndex: "901",
    alignText: "justify",
    whiteSpace: "pre-line",
  },
  arrow: {
    color: "#ffffff",
    width: "5px",
    "z-index": "-1",
  },
};

const msg =
  "Liquidity providers earn a share of trading fees in the form of UP token.";

export const Right = () => (
  <Wrapper>
    <Tooltip styles={classes} content={msg} placement="right" event="onClick">
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);

export const Left = () => (
  <Wrapper>
    <Tooltip styles={classes} content={msg} placement="left" event="onClick">
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);

export const Top = () => (
  <Wrapper>
    <Tooltip styles={classes} content={msg} placement="top" event="onClick">
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);

export const Bottom = () => (
  <Wrapper>
    <Tooltip styles={classes} content={msg} placement="bottom" event="onClick">
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);

export const StartRightHover = () => (
  <Wrapper>
    <Tooltip
      arrow={true}
      styles={classes}
      content={msg}
      placement="right-start"
    >
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);

export const NoArrowEndLeftHover = () => (
  <Wrapper>
    <Tooltip arrow={false} styles={classes} content={msg} placement="left-end">
      <div>Click me</div>
    </Tooltip>
  </Wrapper>
);
