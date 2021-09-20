import React from "react";
import styled from "styled-components";
import { Card, CardBody, CardHeader } from "../Card";
import {
  Table as TableComp,
  TableRow,
  RowColumn,
  ColumnBody,
  RowColumnWrapper,
} from ".";

export default {
  title: "Components/Table",
};

const LogoColumnWrapper = styled(RowColumnWrapper)`
  width: 13rem;
`;

const LogoColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 50px;
    height: auto;
  }
`;

const Row = () => (
  <TableRow>
    <LogoColumnWrapper>
      <LogoColumn>
        <div>
          <img
            src="https://cloudflare-ipfs.com/ipfs/QmWWwaCiZ6atB7r3BbkwokrpQLpCdEqL7MSfQZA2QynJt7"
            alt="unknown logo"
          />
          <img
            src="https://cloudflare-ipfs.com/ipfs/QmWWwaCiZ6atB7r3BbkwokrpQLpCdEqL7MSfQZA2QynJt7"
            alt="unknown logo"
          />
        </div>
        <div>UNFI-BNB</div>
      </LogoColumn>
    </LogoColumnWrapper>

    {[...Array(5).keys()].map((_, i) => (
      <RowColumn title={`TITLE #${i}`} align="right">
        <ColumnBody align="right">
          <div>Body #{i}</div>
        </ColumnBody>
      </RowColumn>
    ))}
  </TableRow>
);

export const Table: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h1>Table</h1>
      </CardHeader>
      <CardBody>
        <TableComp>
          <Row />
          <Row />
          <Row />
          <Row />
        </TableComp>
      </CardBody>
    </Card>
  );
};
