import { ReactNode } from "react";
import { RankedAssociationsProvider } from "./rankedAssociations";
import { DragAndDropProvider } from "./dragAndDrop";

export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <RankedAssociationsProvider>
      <DragAndDropProvider>
        {children}
      </DragAndDropProvider>
    </RankedAssociationsProvider>
  );
}