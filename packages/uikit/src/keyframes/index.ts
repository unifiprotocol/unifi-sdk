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
