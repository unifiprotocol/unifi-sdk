import styled from "styled-components";

export const Card = styled.div`
  background: ${(p) => p.theme.bg100};

  border-radius: ${(p) => p.theme.borderRadius};
  box-shadow: ${(p) => p.theme.boxShadow};
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
