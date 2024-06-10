import AppProvider from "./main-provider";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "shared/components/Table";
import { DropArea, DragItem } from "shared/components/DnD";

import data from "./dummy.json";
import { MouseEventHandler, useState } from "react";

type TableData = {
  type: string;
  title: string[];
  rows: string[][];
  dragEl: HTMLElement | null;
  answer: string[];
};

export default function App() {
  const [dragEl, setDragEl] = useState<HTMLElement | null>(null);
  const [anwserContainer, setAnswerContainer] = useState<HTMLElement | null>(
    null
  );

  const answer = [
    "Chinese",
    "Indian",
    "Egyptian",
    "Saudis",
    "Emiratian",
    "Algerian",
    "Japanese",
    "Thais",
    "Turkish",
    "French",
    "British",
  ];

  const resetPosition: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (!anwserContainer) return;

    const target = e.target as HTMLElement;

    // Remove the element from its current parent
    target.parentElement?.removeChild(target);

    // Append the element to its original parent
    anwserContainer.appendChild(target);
  };

  return (
    <>
      <AppProvider>
        <div className="container grid grid-cols-2 gap-6 justify-between items-center">
          <div>
            <ul className="flex gap-4 px-4 py-3 border border-white rounded flex-wrap min-h-12 w-full">
              {answer.map((ethic) => (
                <DragItem
                  key={ethic}
                  className="italic"
                  setDragItem={setDragEl}
                  setParent={setAnswerContainer}
                  resetPosition={resetPosition}
                  context={ethic}
                />
              ))}
            </ul>
          </div>
          <HorizontalTable {...data} dragEl={dragEl} answer={answer} />
        </div>
      </AppProvider>
    </>
  );
}

function HorizontalTable({ title, rows, dragEl, answer }: TableData) {
  return (
    <>
      <Table>
        <TableCaption>Horizontal Table Demo</TableCaption>
        <TableHeader>
          <TableRow>
            {title.map((title) => (
              <TableHead key={title}>{title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <DropArea
                className="list-none"
                answer={answer[index]}
                dragEl={dragEl}
              >
                {row[1]}
              </DropArea>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
