"use client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useRankedAssociations } from "@/contexts/rankedAssociations";
import { RankedList } from "@/components/RankedList";
import { UnrankedList } from "@/components/UnrankedList";

export default function Home() {
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { unrankedAssociations, rankedAssociations } = useRankedAssociations();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (rankedAssociations.length !== 12) {
      toast.error("Você deve classificar 12 escolas antes de enviar.");
      return;
    }

    setLoading(true);

    const res = await fetch('/api/jackpot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        rankedAssociations,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      toast.error("Algo deu errado na requisição");
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const data = await res.json();
    setLoading(false);
    console.log(data);
    toast.success("Bolão enviado!");
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
          <Input
            name="myname"
            placeholder="Seu nome"
            className="mt-7 mb-3 h-12"
            onChange={event => setName(event.currentTarget.value)}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-lg font-semibold"
            disabled={!name || isLoading}
          >
            {isLoading
              ? <LoaderCircle className="animate-spin w-5 h-5" />
              : <>Enviar</>
            }
            Salvar
          </Button>
        </form>
      )}
    </div>
  );
}
