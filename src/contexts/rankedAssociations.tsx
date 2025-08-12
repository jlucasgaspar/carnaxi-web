"use client";
import { associationsArray } from "@/constants/associations";
import { useContext, createContext, ReactNode, useState } from "react";

type RankedAssociationsProviderProps = {
  children: ReactNode;
};

const RankedAssociationsContext = createContext({
  unrankedAssociations: associationsArray,
  setUnrankedAssociations(associations: typeof associationsArray) {},
  rankedAssociations: [] as typeof associationsArray,
  setRankedAssociations(associations: typeof associationsArray) {}
});

export function RankedAssociationsProvider({ children }: RankedAssociationsProviderProps) {
  const [unrankedAssociations, setUnrankedAssociations] = useState(associationsArray);
  const [rankedAssociations, setRankedAssociations] = useState<typeof associationsArray>([]);

  return (
    <RankedAssociationsContext.Provider value={{
      unrankedAssociations,
      setUnrankedAssociations,
      rankedAssociations,
      setRankedAssociations,
    }}>
      {children}
    </RankedAssociationsContext.Provider>
  );
}

export function useRankedAssociations() {
  const context = useContext(RankedAssociationsContext);
  if (!context) {
    throw new Error(
      "useRankedAssociations must be used within a RankedAssociationsProvider"
    );
  }
  return context;
}