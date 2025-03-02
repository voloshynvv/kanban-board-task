import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { SortableItem } from '@/components/dnd';
import { IssueCard } from './issue-card';

import { columnsConfig } from '../config';
import { IssueStatus } from '../types';

interface BoardColumnProps {
  items: UniqueIdentifier[];
  status: IssueStatus;
}

export const BoardColumn = ({ status, items }: BoardColumnProps) => {
  const { name, color } = columnsConfig[status];
  const { setNodeRef, active } = useDroppable({ id: status });

  const activeColumnId = active?.data.current?.sortable?.containerId;
  const isColumnActive = activeColumnId === status;

  return (
    <Box>
      <HStack mb="2" justifyContent="center">
        <Heading>{name}</Heading>
      </HStack>

      <Box
        bg={isColumnActive ? 'gray.300' : 'gray.200'}
        transition="backgrounds"
        p="5"
        borderTop="4px solid"
        borderColor={color}
        height="72vh"
        overflowY="scroll"
        maxHeight="900px"
      >
        <div ref={setNodeRef}>
          <SortableContext id={status} items={items} strategy={verticalListSortingStrategy}>
            <Stack>
              {items.map((id) => (
                <SortableItem key={id} id={id}>
                  <IssueCard issueId={id as number} />
                </SortableItem>
              ))}
            </Stack>
          </SortableContext>
        </div>
      </Box>
    </Box>
  );
};
