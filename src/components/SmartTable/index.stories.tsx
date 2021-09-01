import { Meta, Story } from '@storybook/react';
import React, { useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getUserCards } from '../../utils/faker';
import SmartTable from './';
import {
  SmartTableBooleanFormatter,
  SmartTableDateFormatter,
} from './formatters';
import useSmartTableState from './hooks/useSmartTableState';
import { SmartTableColumn } from './interfaces/column';
import { SmartTableProps } from './props';
import { State } from './store/reducer';
import { SmartTableToolbarItem } from './templates';

const COLUMNS: SmartTableColumn<Faker.ContextualCard>[] = [
  { name: 'name' },
  { name: 'username' },
  { name: 'email' },
  { name: 'avatar' },
  { name: 'phone' },
  { name: 'website' },
];

const DATA = getUserCards({ count: 100 });

export default {
  title: 'Components/SmartTable',
  component: SmartTable,
  args: {
    data: DATA,
    columns: COLUMNS,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<SmartTableProps>;

export const Overview: Story<SmartTableProps> = (args) => {
  const store = useSmartTableState();

  return <SmartTable {...args} store={store} />;
};

export const WithSorting: Story<SmartTableProps> = (args) => {
  const store = useSmartTableState({
    sorting: [{ columnName: 'name', direction: 'desc' }],
  });

  return <SmartTable {...args} withSorting store={store} />;
};

export const WithFormatting: Story<SmartTableProps<Faker.ContextualCard>> = (
  args,
) => {
  const store = useSmartTableState();

  return (
    <SmartTable
      {...args}
      withSorting
      columns={[
        ...COLUMNS,
        { name: 'dob', title: 'Day of birth' },
        {
          name: 'startsWithA',
          getCellValue: ({ name }) => name.toLowerCase().startsWith('a'),
        },
      ]}
      formatters={[
        <SmartTableDateFormatter key="dob" for={['dob']} format="datetime" />,
        <SmartTableBooleanFormatter key="startsWithA" for={['startsWithA']} />,
      ]}
      store={store}
    />
  );
};

export const StoredState: Story<SmartTableProps> = (args) => {
  const [storedState, setStoredState] = useLocalStorage('meta/stored_state', {
    sorting: [{ columnName: 'name', direction: 'desc' }],
  } as Partial<State>);

  const store = useSmartTableState(storedState);

  useEffect(() => {
    setStoredState(store.state);
  }, [store.state]);

  return <SmartTable {...args} withSorting store={store} />;
};

export const WithToolbar: Story<SmartTableProps> = (args) => {
  const store = useSmartTableState();

  return (
    <SmartTable
      {...args}
      withSorting
      store={store}
      toolbarItems={[
        <SmartTableToolbarItem position="left">left</SmartTableToolbarItem>,
        <SmartTableToolbarItem position="center">center</SmartTableToolbarItem>,
        <SmartTableToolbarItem position="right">right</SmartTableToolbarItem>,
      ]}
    />
  );
};
