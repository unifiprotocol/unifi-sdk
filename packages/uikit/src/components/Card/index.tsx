import styled from "styled-components";

export const Card = styled.div`
  background: ${(p) => p.theme.bgAlt};
  box-shadow: ${(p) => p.theme.cardShadow};
  border-radius: ${(p) => p.theme.borderRadius};
`;

export const CardHeader = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  padding: 1.5rem;
  margin: 0;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;
