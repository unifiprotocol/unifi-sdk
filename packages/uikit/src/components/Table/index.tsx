import React from "react";
import styled from "styled-components";

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 1rem;
  width: 100%;
`;

export const TableRow = styled.tr`
  background: ${(p) => p.theme.bg};
  border-radius: ${(p) => p.theme.borderRadius};
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.2);
  transition: 250ms all;

  &:hover,
  &.active {
    box-shadow: 0 0 33px -22px ${(p) => p.theme.primary};
  }

  @media (${(props) => props.theme.breakpoints.xs}) {
    cursor: pointer;
  }

  td:first-of-type {
    padding-left: 1rem;
  }

  td:last-of-type {
    padding-right: 1rem;
  }
`;

export const RowColumnWrapper = styled.td`
  padding: 0.8rem 0.5rem;
  @media (${(props) => props.theme.breakpoints.xs}) {
    padding: 0.8rem 0.25rem;
  }
  vertical-align: top;
`;

type TAlign = "center" | "left" | "right" | "auto";

export const RowColumn: React.FC<{ title?: string; align?: TAlign }> = ({
  children,
  title,
  align,
}) => {
  return (
    <RowColumnWrapper>
      {title ? <ColumnTitle align={align}>{title}</ColumnTitle> : null}
      {children}
    </RowColumnWrapper>
  );
};

export const ColumnTitle = styled.div<{ align?: TAlign }>`
  text-transform: uppercase;
  font-size: 75%;
  margin-bottom: 0.2rem;
  opacity: 0.8;
  text-align: ${(p) => p.align || "center"};
  color: ${(p) => p.theme.primary};
  position: relative;
`;

export const ColumnBody = styled.div<{ align?: TAlign }>`
  margin: auto 0;
  text-align: ${(p) => p.align || "center"};
`;
