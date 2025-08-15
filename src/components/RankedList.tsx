"use client";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useRankedAssociations } from "@/contexts/rankedAssociations";

function getBgColorForPosition(position: number) {
  if (position === 0) return "bg-lime-100";
  if (position <= 5) return "bg-sky-50";
  if (position === 11) return "bg-rose-100";
  return "";
}

export function RankedList() {
  const { rankedAssociations, setRankedAssociations } = useRankedAssociations();

  function handleClickArrowUp(associationId: string) {
    const index = rankedAssociations.findIndex(({ id }) => id === associationId);
    if (index <= 0) return; // Already at the top

    const newRankedAssociations = [...rankedAssociations];
    const [movedAssociation] = newRankedAssociations.splice(index, 1);
    newRankedAssociations.splice(index - 1, 0, movedAssociation);

    setRankedAssociations(newRankedAssociations);
  }

  function handleClickArrowDown(associationId: string) {
    const index = rankedAssociations.findIndex(({ id }) => id === associationId);
    if (index < 0 || index >= rankedAssociations.length - 1) return; // Already at the bottom
  
    const newRankedAssociations = [...rankedAssociations];
    const [movedAssociation] = newRankedAssociations.splice(index, 1);
    newRankedAssociations.splice(index + 1, 0, movedAssociation);
  
    setRankedAssociations(newRankedAssociations);
  }

  return (
    <Droppable droppableId="list">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`mb-${rankedAssociations.length ? '3' : '0'}`}
        >
          {rankedAssociations.map((association, index) => (
            <Draggable draggableId={association.id} index={index} key={`${association.id}_draggable`}>
              {provided => (
                <div
                  key={association.id + '_ordered'}
                  className={"flex my-2 items-center rounded-lg shadow-sm hover:bg-gray-50 transition-colors p-2 " + getBgColorForPosition(index)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <p className="w-7 font-semibold text-gray-600">
                    {index + 1}.
                  </p>
                  <Image
                    src={`/assets/flags/${association.slug}.png`}
                    alt={association.name}
                    className="rounded-lg border border-gray-300 mx-1"
                    width={60}
                    height={60}
                  />

                  <span className="font-medium text-gray-700 text-sm">
                    {association.name}
                  </span>

                  {index > 0 && index < rankedAssociations.length - 1 && (
                    <div className="ml-auto w-12 flex no-wrap">
                      <Button
                        variant="ghost"
                        className="w-4"
                        onClick={() => handleClickArrowUp(association.id)}
                      >
                        <ArrowUp />
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-4"
                        onClick={() => handleClickArrowDown(association.id)}
                      >
                        <ArrowDown />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}