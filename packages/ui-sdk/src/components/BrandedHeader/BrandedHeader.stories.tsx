import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrandedHeader } from '.';

storiesOf('BrandedHeader', module).add('BrandedHeader', () => (
  <>
    <BrandedHeader />
    <div style={{ paddingTop: '3rem' }}>
      <h1>BrandedHeader</h1>
    </div>
  </>
));
