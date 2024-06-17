import { DragEventHandler, useContext } from "react";
import { cn } from "shared/utils/cn";
import { DnDContext } from "./DnD 1.0/DnDContext";
import { DragItem } from "./DnD 1.0/DragItem";

type DropAreaProps = {
  className?: string;
  answer: string | string[];
  quiz: string;
};

export function DropArea({ className, answer, quiz }: DropAreaProps) {
  const { container, draggingItem, map, setMap } = useContext(DnDContext);

  const onDropHandler: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();

    if (!draggingItem) return;

    const newMap = new Map(map);
    const currentQuizValue = newMap.get(quiz);

    if (currentQuizValue) {
      if (Array.isArray(currentQuizValue)) {
        newMap.set(quiz, [...currentQuizValue, draggingItem.innerText]);
      } else {
        if (typeof answer === "string") {
          const target = e.target as HTMLElement;

          container?.appendChild(target.children[0]);
          newMap.set(quiz, draggingItem.innerText);
          setMap(newMap);
          return;
        }

        newMap.set(quiz, [currentQuizValue, draggingItem.innerText]);
      }
    } else {
      newMap.set(quiz, draggingItem.innerText);
    }
    setMap(newMap);

    draggingItem.parentElement?.removeChild(draggingItem);
  };

  const renderDragItemList = () => {
    if (!map.has(quiz)) return;

    if (Array.isArray(map.get(quiz))) {
      const titleArr = map.get(quiz) as Array<string>;

      return titleArr.map((title: string) => (
        <DragItem className="italic" quiz={quiz} key={title} title={title} />
      ));
    } else {
      const title = map.get(quiz) as string;

      return (
        <DragItem className="italic" quiz={quiz} key={title} title={title} />
      );
    }
  };

  return (
    <td
      className={cn("text-white", className)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropHandler}
    >
      {map.get(quiz) ? renderDragItemList() : quiz}
    </td>
  );
}
