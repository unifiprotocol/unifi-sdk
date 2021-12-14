import styled from 'styled-components';
import { Tooltip } from './index'

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
`

const TooltipContent = styled.div`
background: rgb(0, 230, 118);
color: #ffffff;
align-items: center;
padding: 1em;
text-align:justify;
margin: 0 auto;
white-space:pre-line;
border-radius: 5px;
`;

const classes = {
  tooltip: {
    "width": "20vw",
    "height": "fit-content",
  },
  arrow: {
    color: 'rgb(0, 230, 118)',
    width: "5px",
    'z-index': '900'
  }
}

const msg = 'Liquidity providers earn a share of trading fees in the form of UP token.'

export const Right = () => <Wrapper><Tooltip styles={classes} content={<TooltipContent>{msg}</TooltipContent>} placement='right' event='onClick'>
<div>Click me</div>
</Tooltip></Wrapper>

export const Left = () => <Wrapper><Tooltip styles={classes} content={<TooltipContent>{msg}</TooltipContent>}  placement='left' event='onClick'>
<div>Click me</div>
</Tooltip></Wrapper>

export const Top = () => <Wrapper><Tooltip styles={classes} content={<TooltipContent>{msg}</TooltipContent>} placement='top' event='onClick'>
<div>Click me</div>
</Tooltip></Wrapper>

export const Bottom = () => <Wrapper><Tooltip styles={classes} content={<TooltipContent>{msg}</TooltipContent>} placement='bottom' event='onClick'>
    <div>Click me</div>
</Tooltip></Wrapper>

export const StartRightHover = () => <Wrapper><Tooltip arrow={true} styles={classes} content={<TooltipContent>{msg}</TooltipContent>} placement='right-start'>
<div>Click me</div>
</Tooltip></Wrapper>

export const NoArrowEndLeftHover = () => <Wrapper><Tooltip arrow={false} styles={classes} content={<TooltipContent>{msg}</TooltipContent>}  placement='left-end'>
<div>Click me</div>
</Tooltip></Wrapper>
