import { ReactNode } from 'react';
import WordRow from './word-row';

interface props {
  matchWord: string;
  guessWordsList: string[];
  children: ReactNode;
  length: number;
}

export default function Board({ matchWord, guessWordsList, children, length }: props) {
  const splitWord = (word: string) => (word ? word.split('') : [])
  const rows = new Array(length).fill(null).map((e, i) => i)

  return (
    <>
      {matchWord}
      <div className="letters-container">
        {rows.map((row: number) => <WordRow word={splitWord(guessWordsList[row])} rowIndex={row} key={row}/>)}
        {children}
      </div>
    </>
  );
}
