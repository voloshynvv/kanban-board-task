import { useCallback, useState } from 'react';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Board, TouchedField } from './types';

interface UseDndProps {
  initialItems: Board;
  onDragEnd?: (touchedField: TouchedField) => void;
}

export const useDnd = ({ initialItems, onDragEnd }: UseDndProps) => {
  const [items, setItems] = useState(initialItems);
  const [clonedItems, setClonedItems] = useState<typeof items | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = useCallback(
    (id: UniqueIdentifier) => {
      if (id in items) {
        return id;
      }

      return Object.keys(items).find((key) => items[key].includes(id));
    },
    [items],
  );

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveId(active.id);
      setClonedItems(items);
    },
    [items],
  );

  const handleDragCancel = useCallback(() => {
    if (clonedItems) {
      // Reset items to their original state in case items have been dragged across columns
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  }, [clonedItems]);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const activeContainer = findContainer(active.id);

      if (!activeContainer) {
        setActiveId(null);
        return;
      }

      const overId = over?.id;

      if (overId == null) {
        setActiveId(null);
        return;
      }

      const overContainer = findContainer(overId);

      if (overContainer) {
        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
          const newItems = {
            ...items,
            [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
          };
          setItems(newItems);
        }
      }

      const container = typeof over?.id === 'string' ? over.id : over?.data.current?.sortable.containerId;

      onDragEnd?.({ id: active.id, container });
      setActiveId(null);
    },
    [findContainer, items, onDragEnd],
  );

  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      const overId = over?.id;
      if (!overId || active.id in items) {
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
    },
    [findContainer, items],
  );

  return {
    items,
    activeId,
    sensors,
    handleDragStart,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
  };
};
