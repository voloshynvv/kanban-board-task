import { IssueStatus } from './types';

export const columnsConfig = {
  [IssueStatus.Todo]: {
    name: 'ToDo',
    color: 'red',
  },
  [IssueStatus.InProgress]: {
    name: 'In Progress',
    color: 'purple',
  },
  [IssueStatus.Done]: {
    name: 'Done',
    color: 'blue',
  },
};
