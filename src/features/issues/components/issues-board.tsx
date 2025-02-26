import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Grid } from '@chakra-ui/react';
import { Droppable } from '@/components/dnd/droppable';
import { SortableItem } from '@/components/dnd/sortable-item';

import { IssueCard } from './issue-card';
import { BoardColumn } from './board-column';

export const IssuesBoard = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const [items, setItems] = useState({
    todo: [1, 2, 3],
    inProgress: [4, 5, 6],
    done: [7, 8, 9],
  });

  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setClonedItems(items);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const overId = over?.id;
    const activeContainer = findContainer(active.id);

    if (!overId || !activeContainer) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id);
      const overIndex = items[overContainer].indexOf(overId);

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
        }));
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been dragged
      // across columns
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const handleDragOver = ({ over, active }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.indexOf(overId);
      const activeIndex = activeItems.indexOf(active.id);

      let newIndex: number;

      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const newItems = {
        ...items,
        [activeContainer]: items[activeContainer].filter((item) => item !== active.id),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      };

      setItems(newItems);
    }
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter} // or closestCorners
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap="5">
          <BoardColumn name="ToDo" total={20}>
            <SortableContext items={items.todo} strategy={verticalListSortingStrategy}>
              {items.todo.map((id) => (
                <SortableItem key={id} id={id}>
                  <IssueCard />
                </SortableItem>
              ))}
            </SortableContext>
          </BoardColumn>

          <BoardColumn name="In Progress" total={20}>
            <SortableContext items={items.inProgress} strategy={verticalListSortingStrategy}>
              {items.inProgress.map((id) => (
                <SortableItem key={id} id={id}>
                  <IssueCard />
                </SortableItem>
              ))}
            </SortableContext>
          </BoardColumn>

          <BoardColumn name="Done" total={20}>
            <SortableContext items={items.done} strategy={verticalListSortingStrategy}>
              {items.done.map((id) => (
                <SortableItem key={id} id={id}>
                  <IssueCard />
                </SortableItem>
              ))}
            </SortableContext>
          </BoardColumn>
        </Grid>

        <DragOverlay>{activeId && <IssueCard />}</DragOverlay>
      </DndContext>
    </div>
  );
};
