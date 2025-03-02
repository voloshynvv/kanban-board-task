import { IssueStatus } from './types';

export const columnsConfig = {
  [IssueStatus.Todo]: {
    name: 'ToDo',
    color: 'orange.400',
  },
  [IssueStatus.InProgress]: {
    name: 'In Progress',
    color: 'blue.400',
  },
  [IssueStatus.Done]: {
    name: 'Done',
    color: 'green.400',
  },
};
