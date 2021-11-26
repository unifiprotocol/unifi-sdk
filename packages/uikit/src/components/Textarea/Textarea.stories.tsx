import React from "react";
import { Card, CardBody } from "../Card";
import { Textarea } from ".";

export default {
  title: "Components/Forms/Textarea",
};

export const Default = () => (
  <>
    <h1>Textarea</h1>

    <Card>
      <CardBody>
        <Textarea />
      </CardBody>
    </Card>
  </>
);
