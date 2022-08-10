import React from "react";
import { Hero } from ".";
import styled from "styled-components";

export default {
  title: "Components/Hero",
};

const ExampleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Default: React.FC = () => (
  <>
    <h1>Hero</h1>
    <ExampleWrapper>
      <Hero>
        <h1>Test Hero</h1>
        <p>I'm a superhero</p>
      </Hero>
    </ExampleWrapper>
  </>
);
