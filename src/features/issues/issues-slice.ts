import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, IssueStatus, UpdateIssue } from './types';
import { AsyncSlice, createAppAsyncThunk } from '@/redux/with-types';
import { env } from '@/config/env';
import { urlCleared, urlSet } from '../search/search-slice';
import { RootState } from '@/redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adaptDto = (issue: any): Issue => {
  let status: IssueStatus = IssueStatus.Todo;

  if (issue.state === 'open' && issue.assignee) {
    status = IssueStatus.InProgress;
  }

  if (issue.state === 'open' && !issue.assignee) {
    status = IssueStatus.Todo;
  }

  if (issue.state === 'closed') {
    status = IssueStatus.Done;
  }

  return {
    id: issue.id,
    number: issue.number,
    title: issue.title,
    user: {
      login: issue.user.login,
      id: issue.user.id,
      avatarUrl: issue.user.avatar_url,
      homeUrl: issue.user.html_url,
    },
    state: issue.state,
    assignee: issue.assignee,
    comments: issue.comments,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    status,
  };
};

export const fetchIssues = createAppAsyncThunk(
  'issues/fetchIssues',
  async ({ owner, repo }: { owner: string; repo: string }): Promise<Issue[]> => {
    const response = await fetch(`${env.baseUrl}/repos/${owner}/${repo}/issues?state=all`, {
      headers: {
        Authorization: env.apiKey ? `Bearer ${env.apiKey}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('ops');
    }

    const data = await response.json();
    return data.map(adaptDto);
  },
);

const initialState: AsyncSlice<Issue[]> = {
  data: [],
  status: 'idle',
  error: null,
};

const issuesSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    issueUpdated: (state, action: PayloadAction<UpdateIssue>) => {
      const { id, status } = action.payload;
      const foundIssue = state.data.find((issue) => issue.id === id);

      if (foundIssue) {
        foundIssue.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.error = action.error.message ?? 'Unknown Error';
      })
      .addCase(urlSet, () => initialState)
      .addCase(urlCleared, () => initialState);
  },
});

export const selectIssues = (state: RootState) => {
  return state.issues.data;
};
export const selectIssueById = (state: RootState, issueId: number) => {
  return state.issues.data.find((issue) => issue.id === issueId);
};
export const selectIssuesError = (state: RootState) => {
  return state.issues.error;
};
export const selectIssuesStatus = (state: RootState) => {
  return state.issues.status;
};

export const { issueUpdated } = issuesSlice.actions;
export default issuesSlice.reducer;
