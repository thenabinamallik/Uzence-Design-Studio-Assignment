import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

interface User {
  name: string;
  email: string;
  age: number;
}

const sampleData: User[] = [
  { name: 'Alice', email: 'alice@example.com', age: 25 },
  { name: 'Bob', email: 'bob@example.com', age: 30 },
  { name: 'Charlie', email: 'charlie@example.com', age: 22 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  args: {
    data: sampleData,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email' },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    ],
    selectable: true,
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};
