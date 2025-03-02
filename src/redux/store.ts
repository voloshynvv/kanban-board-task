import { combineReducers, configureStore } from '@reduxjs/toolkit';

import issuesReducer from '@/features/issues/issues-slice';
import repoReducer from '@/features/repo/repo-slice';
import searchReducer from '@/features/search/search-slice';

// Create the root reducer independently to obtain the RootState type
export const rootReducer = combineReducers({
  issues: issuesReducer,
  repo: repoReducer,
  search: searchReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
