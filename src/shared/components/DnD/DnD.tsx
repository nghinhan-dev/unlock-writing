import {
  Dispatch,
  DragEventHandler,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { cn } from "shared/utils/cn";

interface DragElProps {
  className?: string;
  setDragItem: Dispatch<SetStateAction<HTMLElement | null>>;
  setParent: Dispatch<SetStateAction<HTMLElement | null>>;
  context: string;
  resetPosition: MouseEventHandler<HTMLElement>;
}

const DragItem = ({
  className,
  setDragItem,
  context,
  resetPosition,
  setParent,
}: DragElProps) => {
  const onDragStartHandler: DragEventHandler<HTMLLIElement> = (e) => {
    setDragItem(e.currentTarget);
    setParent(e.currentTarget.parentElement);
  };

  return (
    <li
      className={cn("select-none", className)}
      draggable={true}
      onDragStart={onDragStartHandler}
      onContextMenu={resetPosition}
    >
      {context}
    </li>
  );
};

interface DropAreaProps {
  dragEl?: HTMLElement | null;
  className?: string;
  children: ReactNode;
  answer: string | string[];
}

const DropArea = ({ className, dragEl, children, answer }: DropAreaProps) => {
  const onDragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onDropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (!dragEl) return;
    dragEl.parentElement?.removeChild(dragEl);
    if (e.currentTarget instanceof HTMLElement) {
      if (!Array.isArray(answer)) {
        e.currentTarget.innerText = "";
      }

      e.currentTarget.appendChild(dragEl);
    }
  };

  return (
    <td
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
      className={cn(
        `text-white ${Array.isArray(answer) ? "flex gap-1" : ""}`,
        className
      )}
    >
      {children}
    </td>
  );
};

export { DragItem, DropArea };
