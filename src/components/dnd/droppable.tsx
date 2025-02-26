import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export const Droppable = ({ id, children }: DroppableProps) => {
  const { setNodeRef: setFirstDroppableRef, isOver } = useDroppable({
    id,
  });

  return (
    <div ref={setFirstDroppableRef} style={{ background: isOver ? '' : '' }}>
      {children}
    </div>
  );
};
