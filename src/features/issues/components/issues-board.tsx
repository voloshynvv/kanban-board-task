import { closestCenter, closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import { Grid } from '@chakra-ui/react';
import { useDnd } from '@/components/dnd';
import { IssueCard } from './issue-card';
import { BoardColumn } from './board-column';

import { getIssues, prepareBoard } from '../utilts';
import { IssueStatus } from '../types';

export const IssuesBoard = () => {
  const issues = getIssues();

  const { activeId, items, sensors, handleDragCancel, handleDragOver, handleDragStart, handleDragEnd } = useDnd({
    initialItems: prepareBoard(issues),
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap={5}>
        <BoardColumn status={IssueStatus.Todo} items={items[IssueStatus.Todo]} />
        <BoardColumn status={IssueStatus.InProgress} items={items[IssueStatus.InProgress]} />
        <BoardColumn status={IssueStatus.Done} items={items[IssueStatus.Done]} />
      </Grid>

      <DragOverlay
        dropAnimation={{
          duration: 500,
        }}
      >
        {activeId && <IssueCard />}
      </DragOverlay>
    </DndContext>
  );
};
