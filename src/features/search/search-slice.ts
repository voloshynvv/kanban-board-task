import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { localStorageService } from '@/services/local-storage';

interface SearchSliceState {
  url: string;
  owner: string;
  repo: string;
}

const savedSearch = localStorageService.getItem<SearchSliceState>('search');

export const initialState = {
  url: '',
  owner: '',
  repo: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: savedSearch || initialState,
  reducers: {
    urlSet: (state, action: PayloadAction<{ url: string; owner: string; repo: string }>) => {
      const { owner, repo, url } = action.payload;

      state.url = url;
      state.repo = repo;
      state.owner = owner;
    },
    urlCleared: () => {
      return initialState;
    },
  },
});

export const selectSearchUrl = (state: RootState) => {
  return state.search.url;
};
export const selectSearchOwner = (state: RootState) => {
  return state.search.owner;
};
export const selectSearchRepo = (state: RootState) => {
  return state.search.repo;
};

export const { urlSet, urlCleared } = searchSlice.actions;
export default searchSlice.reducer;
