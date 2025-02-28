export enum IssueStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
}

enum IssueState {
  Open,
  Closed,
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    avatarUrl: string;
  };
  state: IssueState;
  status: IssueStatus;
  assignee: null | string;
  comments: number;
  createdAt: string;
  updatedAt: string;
  order: number;
}
