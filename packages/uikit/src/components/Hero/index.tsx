import styled from "styled-components";
import doodle from "./doodle.png";

export const Hero = styled.div`
  width: 100%;

  background: url(${doodle}) #191a21;
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: -8rem;

  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  text-align: justify;

  @media (max-width: 576px) {
    padding: 0;
    max-width: 100%;
    background: none;
  }

  h1 {
    margin: 0.5rem 0;
  }
`;
