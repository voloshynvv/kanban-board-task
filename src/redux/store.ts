import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '@/features/issues/issues-slice';
import repoReducer from '@/features/repo/repo-slice';
import searchReducer from '@/features/search/search-slice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    repo: repoReducer,
    search: searchReducer,
  },
});
