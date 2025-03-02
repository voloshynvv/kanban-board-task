import '@testing-library/jest-dom/vitest';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { env } from './config/env';

// MOCKS
const repoMock = {
  id: 10270250,
  name: 'mocked repo',
  description: '',
  html_url: `https://github.com/owner/repo`,
  owner: {
    login: 'user',
    html_url: `https://github.com/user`,
  },
  stargazers_count: 232791,
};
const issuesMock = [
  {
    id: 2889570583,
    number: 8735,
    title: 'test(query-core): add hashKey test code',
    user: {
      login: 'Collection50',
      id: 86355699,
      avatar_url: 'https://avatars.githubusercontent.com/u/86355699?v=4',
      html_url: 'https://api.github.com/users/Collection50',
    },
    state: 'open',
    assignee: null,
    comments: 0,
    created_at: '2025-03-02T14:04:26Z',
    updated_at: '2025-03-02T14:04:38Z',
  },
  {
    id: 2889473965,
    number: 8734,
    title: 'feat(react-query): Add `usePrefetchQueries` hook',
    user: {
      login: 'DogPawHat',
      id: 2125961,
      avatar_url: 'https://avatars.githubusercontent.com/u/2125961?v=4',
      html_url: 'https://github.com/DogPawHat',
    },
    state: 'open',
    assignee: null,
    comments: 3,
    created_at: '2025-03-02T10:52:20Z',
    updated_at: '2025-03-02T10:58:42Z',
  },
];

export const server = setupServer(
  http.get(`${env.baseUrl}/repos/:owner/:repo`, () => {
    return HttpResponse.json(repoMock);
  }),
  http.get(`${env.baseUrl}/repos/:owner/:repo/issues`, () => {
    return HttpResponse.json(issuesMock);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
