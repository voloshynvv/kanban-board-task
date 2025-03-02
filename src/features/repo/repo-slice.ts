import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AsyncSlice, createAppAsyncThunk } from '@/redux/with-types';
import { Repo } from './types';
import { env } from '@/config/env';
import { urlCleared, urlSet } from '../search/search-slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adaptDto = (repo: any): Repo => {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    owner: {
      login: repo.owner.login,
      url: repo.owner.html_url,
    },
    stars: repo.stargazers_count,
  };
};

export const fetchRepo = createAppAsyncThunk(
  'repo/fetchRepo',
  async ({ owner, repo }: { owner: string; repo: string }): Promise<Repo> => {
    const response = await fetch(`${env.baseUrl}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: env.apiKey ? `Bearer ${env.apiKey}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('repo failed');
    }

    const data = await response.json();
    return adaptDto(data);
  },
);

const initialState: AsyncSlice<Repo> = {
  data: {} as Repo,
  status: 'idle',
  error: null,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        state.status = 'failed';
        state.data = {} as Repo;
        state.error = action.error.message ?? 'Unknown Error';
      })
      .addCase(urlSet, () => initialState)
      .addCase(urlCleared, () => initialState);
  },
});

export const selectRepo = (state: RootState) => {
  return state.repo.data;
};
export const selectRepoError = (state: RootState) => {
  return state.repo.error;
};
export const selectRepoStatus = (state: RootState) => {
  return state.repo.status;
};

export default repoSlice.reducer;
