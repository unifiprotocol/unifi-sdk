import React from "react";
import * as Icons from ".";
import styled from "styled-components";

export default {
  title: "Components/Icons",
};

const ExampleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 1rem;

  svg {
    fill: ${(props) => props.theme.primary};
    width: 3rem;
    height: auto;
  }
`;

export const Default: React.FC = () => (
  <>
    <h1>Icons</h1>
    <h4>Find all the icons in the next link:</h4>
    <ul>
      <li>
        <a href="https://react-icons.github.io/react-icons/" target="_blank">
          https://react-icons.github.io/react-icons/
        </a>
      </li>
    </ul>

    <h2>Some examples</h2>
    <ExampleWrapper>
      {Object.keys(Icons)
        .sort(() => Math.random() - 0.5)
        .slice(0, 50)
        .map((k) => {
          const Comp = Icons[k];
          return (
            <IconWrapper>
              <Comp />
              <span>{k}</span>
            </IconWrapper>
          );
        })}
    </ExampleWrapper>
  </>
);
