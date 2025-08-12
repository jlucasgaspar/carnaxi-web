"use client";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useRankedAssociations } from "@/contexts/rankedAssociations";
import { RankedList } from "@/components/RankedList";
import { UnrankedList } from "@/components/UnrankedList";

export default function Home() {
  const { unrankedAssociations, rankedAssociations } = useRankedAssociations();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("myname") as string;
    if (!name) {
      alert("Por favor, informe seu nome.");
      return;
    }
    console.log({ formData, name });
  }

  return (
    <div className="h-full w-full px-8 py-4">
      <RankedList />

      {unrankedAssociations.length && rankedAssociations.length
        ? <Separator className="my-7" />
        : <></>
      }

      <UnrankedList />

      {rankedAssociations.length === 12 && (
        <form onSubmit={handleSubmit}>
          <Input name="myname" placeholder="Seu nome" className="mt-7 mb-3 h-12" />
          <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold">
            Salvar
          </Button>
        </form>
      )}
    </div>
  );
}
