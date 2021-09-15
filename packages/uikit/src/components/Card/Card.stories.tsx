import React from "react";
import { Card, CardHeader, CardBody } from ".";

export default {
  title: "Components/Card",
};

export const Default = () => (
  <>
    <h1>Cards</h1>

    <Card>
      <CardHeader>
        <h3>Card title</h3>
      </CardHeader>
      <CardBody>Content</CardBody>
    </Card>
  </>
);
