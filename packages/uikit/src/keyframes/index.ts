import { keyframes } from "styled-components";

export const kfShine = keyframes`
  to {
     background-position: 200% center;
   }
 `;

export const kfSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  `;
export const kfEnter = keyframes`
0%{
  transform:scale(.9);
  opacity:0
}
to{
  transform:scale(1);
  opacity:1
  }
`;

export const kfLeave = keyframes`
  0%{
    transform:scale(1);
    opacity:1
  }
  to{
    transform:scale(.9);
    opacity:0
  }
`;
