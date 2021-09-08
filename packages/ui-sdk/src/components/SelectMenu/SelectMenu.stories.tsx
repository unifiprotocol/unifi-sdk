import React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectMenu } from '.';

storiesOf('SelectMenu', module).add('SelectMenu', () => (
  <>
    <h1>SelectMenu</h1>
    <SelectMenu
      disabled={true}
      label='Sort by'
      options={[
        { label: 'APY', value: 'apy' },
        { label: 'APR', value: 'apr', isDisabled: true },
        { label: 'Stake', value: 'stake' },
      ]}
    />
  </>
));
