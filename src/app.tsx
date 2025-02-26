import { Container } from '@chakra-ui/react';

import { IssuesBoard } from '@/features/issues/components/issues-board';

export const App = () => {
  return (
    <main>
      <Container maxW="6xl">
        <IssuesBoard />
      </Container>
    </main>
  );
};
