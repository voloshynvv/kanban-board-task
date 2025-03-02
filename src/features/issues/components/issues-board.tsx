import { useEffect, useState } from 'react';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '@/redux/with-types';

import { Grid } from '@chakra-ui/react';
import { useDnd } from '@/components/dnd';
import { IssueCard } from './issue-card';
import { BoardColumn } from './board-column';

import { issueUpdated } from '../issues-slice';
import { prepareBoard } from '../utilts';
import { Issue, IssueStatus } from '../types';
import { localStorageService } from '@/services/local-storage';
import { Board } from '@/components/dnd/types';

interface IssuesBoardProps {
  issues: Issue[];
  repo: string;
  owner: string;
}

export const IssuesBoard = ({ issues, repo, owner }: IssuesBoardProps) => {
  const dispatch = useAppDispatch();

  const localStorageKey = `${owner}-${repo}`;
  const savedBoard = localStorageService.getItem<Board>(localStorageKey);
  const initialItems = savedBoard ? savedBoard : prepareBoard(issues);

  const { activeId, items, sensors, handleDragCancel, handleDragOver, handleDragStart, handleDragEnd } = useDnd({
    initialItems,
    onDragEnd: (touchedField) => {
      dispatch(issueUpdated({ id: touchedField.id as number, status: touchedField.container as IssueStatus }));
    },
  });

  useEffect(() => {
    localStorageService.setItem(localStorageKey, items);
  }, [localStorageKey, items]);

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
        {activeId && <IssueCard issueId={activeId as number} />}
      </DragOverlay>
    </DndContext>
  );
};
