"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRankedAssociations } from "@/contexts/rankedAssociations";
import { associationsArray } from "@/constants/associations";

export function UnrankedList() {
  const {
    rankedAssociations,
    setRankedAssociations,
    unrankedAssociations,
    setUnrankedAssociations
  } = useRankedAssociations();

  function handleClickUnrankedAssociation(associationId: string) {
    const clickedAssociation = associationsArray.find(({ id }) => id === associationId);
    if (!clickedAssociation) return;

    const newRankedAssociations = [...rankedAssociations, clickedAssociation];
    setRankedAssociations(newRankedAssociations);
    const newUnrankedAssociations = unrankedAssociations.filter(({ id }) => id !== associationId);
    setUnrankedAssociations(newUnrankedAssociations);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <>
      {unrankedAssociations.map((association) => (
        <Button
          key={association.id}
          className="h-20 w-full justify-start my-1.5 transition-transform active:bg-gray-100"
          variant="outline"
          onClick={() => handleClickUnrankedAssociation(association.id)}
        >
          <Image
            src={`/assets/flags/${association.slug}.png`}
            alt={association.name}
            className="rounded-lg border border-gray-300"
            width={60}
            height={60}
          />
          {association.name}
        </Button>
      ))}
    </>
  )
}