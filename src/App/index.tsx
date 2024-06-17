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

import data from "./dummy.json";
import { DropArea, DragItem, DnDProvider } from "shared/components/DnD";

type TableData = {
  type: string;
  title: string[];
  rows: string[][];
  answer: string[];
};

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

export default function App() {
  return (
    <>
      <AppProvider>
        <DnDProvider>
          <div className="container grid grid-cols-2 gap-6 justify-between items-center">
            <div>
              <ul className="flex gap-4 px-4 py-3 border border-white rounded flex-wrap min-h-12 w-full">
                {data.rows.map((row, index) => (
                  <DragItem
                    key={answer[index]}
                    quiz={row[1]}
                    className="italic"
                    title={answer[index]}
                  />
                ))}
              </ul>
            </div>
            <HorizontalTable {...data} answer={answer} />
          </div>
        </DnDProvider>
      </AppProvider>
    </>
  );
}

function HorizontalTable({ title, rows, answer }: TableData) {
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
                quiz={row[1]}
                className="list-none"
                answer={answer[index]}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
