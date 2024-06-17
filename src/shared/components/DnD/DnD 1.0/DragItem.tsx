import { DragEventHandler, MouseEventHandler, useContext } from "react";
import { cn } from "shared/utils/cn";
import { DnDContext } from "./DnDContext";

type DragItem = {
  className?: string;
  title: string;
  quiz: string;
};

export const DragItem = ({ className, title, quiz }: DragItem) => {
  const { container, map, setContainer, setDraggingItem, setMap } =
    useContext(DnDContext);

  const onDragStartHandler: DragEventHandler<HTMLLIElement> = (e) => {
    setDraggingItem(e.currentTarget);
    setContainer(e.currentTarget.parentElement);
  };

  const resetPosition: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!container || e.currentTarget.parentElement === container) return;

    const target = e.target as HTMLElement;

    const newMap = new Map(map);

    const newQuizArray = map.get(quiz);
    if (!newQuizArray) return;

    if (Array.isArray(newQuizArray)) {
      const index = newQuizArray.findIndex((q) => q === quiz);
      if (index > -1) {
        newQuizArray.splice(index, 1);
        newMap.set(quiz, newQuizArray);
      }
    } else {
      newMap.delete(quiz);
    }

    console.log(newMap);

    setMap(newMap);
    console.log(target.parentElement);
    // container.appendChild(target);

    return;
  };

  return (
    <li
      className={cn("select-none", className)}
      draggable={true}
      onDragStart={onDragStartHandler}
      onContextMenu={resetPosition}
    >
      {title}
    </li>
  );
};
