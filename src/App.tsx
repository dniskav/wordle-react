import { useEffect, useRef, useState } from 'react';
import Board from './components/board';
import useGetRandomWord from './hooks/useGetRandomWord';
import { checkWord } from './utils/checkwords';
import useGuessWordListener from './hooks/useGuessWordListener';
import { TestLetter, TestWord } from './types/common.types';
import { useGameContext } from './hooks/useGameContext';
import confetti from "canvas-confetti";
import './App.css';

// [x] craate board component
// [x] load words from file and get one random word
// [x] chose a word and save it in state
// [x] listen the key press and draw the letter on the corresponding box
// [x] game logic to check if the letter is in the word and if it in the position or not
// [x] add logic to add a new row if the word not match
// [x] use the match position to color green if it is correct position
// [x] use the match position to color yellow if it is not correct position
// [x] check if the word matches and show the win message
// [] check if the tries is over and show the lose message
// [x] enable the restart button
// [] save the game state in local storage

function App() {
  const { newWord, fetchNewWord } = useGetRandomWord();
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const wordLength = 6;
  const tries = 6;
  const { guessWord, setGuessWord, setEndGame } = useGuessWordListener(wordLength);
  const [guessWordsList, setGuessWordsList] = useState<string[]>([]);
  const { testedWordsList, setTestedWordsList } = useGameContext();

  const newWordRef = useRef<string>(newWord);

  const resetGame = () => {
    setGuessWord('');
    fetchNewWord();
    setGuessWordsList([]);
    setTestedWordsList([]);
    setEndGame(false)
    setIsWinner(false)
  };

  useEffect(() => {
    setGuessWordsList((guessWordsList) => {
      const tempList = [
        ...guessWordsList.slice(0, -1),
        guessWord.toLocaleUpperCase(),
      ];
      return tempList;
    });
  }, [guessWord]);

  useEffect(() => {
    newWordRef.current = newWord;
  }, [newWord]);

  useEffect(() => {
    if(isWinner){
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
      setEndGame(isWinner);
    } else if(testedWordsList.length === tries){
      setEndGame(true);
      setIsWinner(false);
    }
  },[isWinner, setEndGame, testedWordsList, tries])

  useEffect(() => {
    if (guessWord.length === wordLength && newWordRef.current) {
      const testWord: TestLetter[] = checkWord(guessWord, newWordRef.current);
      setTestedWordsList((currentList: TestWord[]) => [...currentList, testWord]);
      setGuessWordsList((wordsList) => [...wordsList, '']);
      setGuessWord('');
      setIsWinner(checkWin(testWord));
    }
  }, [guessWord, setGuessWord, testedWordsList, setTestedWordsList]);

  const checkWin = (testWord: TestWord) => {
    const isWinnert = testWord.every((letter: TestLetter) => {
      return letter.isInPosition;
    })

    return isWinnert;
  }

  return (
    <>
      <h1 className="web-title">React Wordle</h1>

      <Board matchWord={newWord} guessWordsList={guessWordsList} length={6}>
        <div className="message-container">
          <p className="message-text">
            {isWinner && 'We have a winner!'}
            {!isWinner && testedWordsList.length === tries && 'You lose!'}
          </p>
        </div>
        <div className="restar-container">
          <button className="restart-button" onClick={resetGame}>
            Restart
          </button>
        </div>
      </Board>
      {/* <div className="debuger">
        <pre>{JSON.stringify(testedWordsList, null, 2)}</pre>
      </div> */}
    </>
  );
}

export default App;
