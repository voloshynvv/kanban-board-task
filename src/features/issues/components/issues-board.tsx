import { Grid } from '@chakra-ui/react';

import { IssueCard } from './issue-card';
import { BoardColumn } from './board-column';

export const IssuesBoard = () => {
  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap="5">
        <BoardColumn name="ToDo" total={30}>
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </BoardColumn>

        <BoardColumn name="In Progress" total={5}>
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </BoardColumn>

        <BoardColumn name="Done" total={11}>
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </BoardColumn>
      </Grid>
    </div>
  );
};
