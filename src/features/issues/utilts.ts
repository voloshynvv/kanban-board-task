import issues from '@/mocks/issues.json';
import { Board } from '@/components/dnd/types';
import { Issue, IssueStatus } from './types';

export const getIssues = () => {
  return issues.map((issue, i) => {
    let status: null | string = null;

    if (issue.state === 'open' && issue.assignee) {
      status = 'inProgress';
    }

    if (issue.state === 'open' && !issue.assignee) {
      status = 'todo';
    }

    if (issue.state === 'closed') {
      status = 'done';
    }

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      user: {
        login: issue.user.login,
        id: issue.user.id,
        avatarUrl: issue.user.avatar_url,
      },
      state: issue.state,
      status,
      assignee: issue.assignee,
      comments: issue.comments,
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      order: i,
    };
  });
};

export const prepareBoard = (issues: Issue[]) => {
  const board: Board = {
    [IssueStatus.Todo]: [],
    [IssueStatus.InProgress]: [],
    [IssueStatus.Done]: [],
  };

  issues.forEach((issue) => {
    if (issue.status in board) {
      board[issue.status].push(issue.id);
    }
  });

  return board;
};
