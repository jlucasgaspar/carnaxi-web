"use client";
import { DragDropContext } from '@hello-pangea/dnd';
import { useContext, createContext, ReactNode } from "react";
import { useRankedAssociations } from './rankedAssociations';
import { associationsArray } from '@/constants/associations';

type DragAndDropProviderProps = {
  children: ReactNode;
};

const DrangAndDropCtx = createContext({});

const reorder = (list: typeof associationsArray, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export function DragAndDropProvider({ children }: DragAndDropProviderProps) {
  const { rankedAssociations, setRankedAssociations } = useRankedAssociations();

  function handleEndDrag(result: any) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const reorderedArray = reorder(
      rankedAssociations,
      result.source.index,
      result.destination.index
    );

    setRankedAssociations(reorderedArray);
  }

  return (
    <DragDropContext onDragEnd={handleEndDrag}>
      <DrangAndDropCtx.Provider value={{}}>
        {children}
      </DrangAndDropCtx.Provider>
    </DragDropContext>
  );
}

export function useDragAndDrop() {
  const context = useContext(DrangAndDropCtx);
  if (!context) {
    throw new Error(
      "useDragAndDrop must be used within a DragAndDropProvider"
    );
  }
  return context;
}