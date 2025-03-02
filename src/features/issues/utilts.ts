import { Issue, IssueStatus } from './types';
import { Board } from '@/components/dnd';

export const prepareBoard = (issues: Issue[]) => {
  const board: Board = {
    [IssueStatus.Todo]: [],
    [IssueStatus.InProgress]: [],
    [IssueStatus.Done]: [],
  };

  issues.forEach((issue) => {
    if (issue.status && issue.status in board) {
      board[issue.status].push(issue.id);
    }
  });

  return board;
};
