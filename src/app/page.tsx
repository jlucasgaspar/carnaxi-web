"use client";
import { Separator } from "@/components/ui/separator";
import { useRankedAssociations } from "@/contexts/rankedAssociations";
import { RankedList } from "@/components/RankedList";
import { UnrankedList } from "@/components/UnrankedList";
import { RankForm } from "@/components/RankForm";

export default function Home() {
  const { unrankedAssociations, rankedAssociations } = useRankedAssociations();

  return (
    <div className="h-full w-full px-8 py-4">
      <RankedList />

      {unrankedAssociations.length && rankedAssociations.length
        ? <Separator className="my-7" />
        : <></>
      }

      <UnrankedList />

      {rankedAssociations.length === 12 && (
        <RankForm />
      )}
    </div>
  );
}
