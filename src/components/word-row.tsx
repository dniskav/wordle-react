import { useGameContext } from '../hooks/useGameContext';
import Box from './box';

interface props {
  word: string[];
  rowIndex: number;
}

export default function WordRow({ word, rowIndex }: props) {
  const { testedWordsList } = useGameContext();

  const isInWord = (pos: number) => {
    if (testedWordsList[rowIndex]) {
      return testedWordsList[rowIndex][pos].isInWord;
    }
    return false;
  }
  const isInPosition = (pos: number) => {
    if (testedWordsList[rowIndex]) {
      return testedWordsList[rowIndex][pos].isInPosition;
    }
    return false;
  }

  return (
    <div className="letter-row">
      <Box
        letter={word[0]}
        isInWord={isInWord(0)}
        isInPosition={isInPosition(0)}
      />
      <Box
        letter={word[1]}
        isInWord={isInWord(1)}
        isInPosition={isInPosition(1)}
      />
      <Box
        letter={word[2]}
        isInWord={isInWord(2)}
        isInPosition={isInPosition(2)}
      />
      <Box
        letter={word[3]}
        isInWord={isInWord(3)}
        isInPosition={isInPosition(3)}
      />
      <Box
        letter={word[4]}
        isInWord={isInWord(4)}
        isInPosition={isInPosition(4)}
      />
      <Box
        letter={word[5]}
        isInWord={isInWord(5)}
        isInPosition={isInPosition(5)}
      />
    </div>
  );
}
