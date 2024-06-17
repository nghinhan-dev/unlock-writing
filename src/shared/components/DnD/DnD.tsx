import { ReactNode, useReducer, createContext, Dispatch } from "react";

type DnDState = {
  dragElement: string[];
  answerMap: Map<string, string | string[]>;
};

const initialDnDState: DnDState = {
  dragElement: [],
  answerMap: new Map<string, string | string[]>(),
};

export const DnDContext = createContext<DnDState>(initialDnDState);
export const DnDDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null
);

type DnDProviderProps = {
  children: ReactNode;
};

type ACTIONTYPE =
  | { type: "addDragElement"; payload: string }
  | { type: "removeDragElement"; payload: number }
  | { type: "deleteAnswerMap"; payload: string };

function dndReducer(state: DnDState, action: ACTIONTYPE) {
  switch (action.type) {
    case "addDragElement":
      return { ...state, dragElement: [...state.dragElement, action.payload] };
    case "removeDragElement":
      return {
        ...state,
        dragElement: state.dragElement.filter(
          (_, index) => index !== action.payload
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
}

export function DnDProvider({ children }: DnDProviderProps) {
  const [state, dispatch] = useReducer(dndReducer, initialDnDState);

  return (
    <DnDContext.Provider value={state}>
      <DnDDispatchContext.Provider value={dispatch}>
        {children}
      </DnDDispatchContext.Provider>
    </DnDContext.Provider>
  );
}
