import { SmartTableColumn } from './interfaces/column';
import { ActionDispatchers } from './store/actions';
import { State } from './store/reducer';

export type SmartTableStoreProps = {
  state: State;
  dispatchers: ActionDispatchers;
};

export type SmartTableProps<T = any> = {
  data: T[];
  columns: SmartTableColumn<T>[];
  store?: SmartTableStoreProps;
};