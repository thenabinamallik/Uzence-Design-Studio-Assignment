import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'This is a helper text',
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'This field is required',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
  },
};
