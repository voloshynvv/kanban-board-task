import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/with-types';

import { Container, Stack } from '@chakra-ui/react';
import { AppSkeleton } from '@/components/app-skeleton';
import { SearchForm } from '@/features/search/components/search-form';
import { RepoDetails } from '@/features/repo/components/repo-details';
import { IssuesBoard } from '@/features/issues/components/issues-board';

import { fetchIssues } from '@/features/issues/issues-slice';
import { fetchRepo } from '@/features/repo/repo-slice';

import searchIcon from '@/assets/search.svg';
import errorIcon from '@/assets/error.svg';

export const App = () => {
  const dispatch = useAppDispatch();
  const owner = useAppSelector((state) => state.search.owner);
  const repo = useAppSelector((state) => state.search.repo);
  const issuesStatus = useAppSelector((state) => state.issues.status);
  const repoStatus = useAppSelector((state) => state.repo.status);
  const issues = useAppSelector((state) => state.issues.data);
  const repoDetails = useAppSelector((state) => state.repo.data);

  const idle = repoStatus === 'idle' && issuesStatus === 'idle';
  const pending = repoStatus === 'pending' || issuesStatus === 'pending';
  const failed = repoStatus === 'failed' || issuesStatus === 'failed';
  const succeeded = repoStatus === 'succeeded' && issuesStatus === 'succeeded';

  useEffect(() => {
    if (!repo || !owner) {
      return;
    }

    const params = { repo, owner };

    dispatch(fetchIssues(params));
    dispatch(fetchRepo(params));
  }, [dispatch, repo, owner]);

  return (
    <main>
      <Container maxW="6xl" py="3">
        <Stack gap="2">
          <SearchForm />

          {idle && (!repo || !owner) && (
            <Stack alignItems="center" mt="4" textAlign="center">
              <img width={150} height={120} src={searchIcon} alt="" />
              <p>Search, filter, and re-order issues from any repository with ease.</p>
              <p>Enter a GitHub repository to get started!</p>
            </Stack>
          )}

          {failed && (
            <Stack alignItems="center" mt="4" textAlign="center">
              <img width={150} height={120} src={errorIcon} alt="" />
              <p>Oops! Something went wrong. Try again in a bit!</p>
            </Stack>
          )}

          {pending && <AppSkeleton />}

          {succeeded && (
            <>
              <RepoDetails repo={repoDetails} />
              <IssuesBoard owner={owner} repo={repo} issues={issues} />
            </>
          )}
        </Stack>
      </Container>
    </main>
  );
};
