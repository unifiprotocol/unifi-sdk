import styled from "styled-components";
import { Themed } from "../..";

export const TextareaElement = styled.textarea<Themed>`
  outline: 0;
  margin: 0;
  border: 0;
  resize: none;
  padding: 0.5rem;
  display: block;
  color: ${(p) => p.theme.txt100};
  background: ${(p) => p.theme.bgInput};
  border-radius: ${(p) => p.theme.borderRadius};
  width: 100%;
`;
