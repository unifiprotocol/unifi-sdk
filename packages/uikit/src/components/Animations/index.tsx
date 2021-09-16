import styled from "styled-components";
import { kfSpin } from "../../keyframes";

export const Spin = styled.span`
  > * {
    animation: ${kfSpin} 5s linear infinite;
  }
`;
