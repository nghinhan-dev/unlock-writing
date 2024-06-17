import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type DragElement = HTMLElement | null;

type DnDProviderProps = {
  children: ReactNode;
};

type DnDProviderState = {
  map: Map<string, string | string[]>;
  setMap: Dispatch<SetStateAction<Map<string, string | string[]>>>;
  draggingItem: DragElement;
  setDraggingItem: Dispatch<SetStateAction<DragElement>>;
  container: DragElement;
  setContainer: Dispatch<SetStateAction<DragElement>>;
};

const initialDnDProviderState: DnDProviderState = {
  map: new Map(),
  setMap: () => null,
  draggingItem: null,
  setDraggingItem: () => null,
  container: null,
  setContainer: () => null,
};

export const DnDContext = createContext<DnDProviderState>(
  initialDnDProviderState
);

export function DnDProvider({ children }: DnDProviderProps) {
  const [map, setMap] = useState<Map<string, string | string[]>>(new Map());
  const [container, setContainer] = useState<DragElement>(null);
  const [draggingItem, setDraggingItem] = useState<DragElement>(null);

  const dndValue = {
    map,
    setMap,
    container,
    setContainer,
    draggingItem,
    setDraggingItem,
  };

  return <DnDContext.Provider value={dndValue}>{children}</DnDContext.Provider>;
}
