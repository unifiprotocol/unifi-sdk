import React from 'react';
import { storiesOf } from '@storybook/react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '.';

storiesOf('Button', module)
  .add('PrimaryButton', () => <PrimaryButton>Button</PrimaryButton>)
  .add('SecondaryButton', () => <SecondaryButton>Button</SecondaryButton>)
  .add('TertiaryButton', () => <TertiaryButton>Button</TertiaryButton>);
