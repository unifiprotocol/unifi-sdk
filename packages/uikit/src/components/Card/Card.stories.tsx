import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, CardHeader, CardBody } from '.';

storiesOf('Card', module).add('Card', () => (
  <>
    <h1>Cards</h1>

    <Card>
      <CardHeader>
        <h3>Card title</h3>
      </CardHeader>
      <CardBody>Content</CardBody>
    </Card>
  </>
));
