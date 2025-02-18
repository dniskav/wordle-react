import { useEffect, useRef, useState, useCallback } from "react";
import Board from "./components/board";
import useGetRandomWord from "./hooks/useGetRandomWord";
import { checkWord } from "./utils/checkwords";
import useGuessWordListener from "./hooks/useGuessWordListener";
import { TestLetter, TestWord } from "./types/common.types";
import { useGameContext } from "./hooks/useGameContext";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const { newWord, fetchNewWord } = useGetRandomWord();
  const { guessWord, setGuessWord, setEndGame } = useGuessWordListener(6);
  const { testedWordsList, setTestedWordsList } = useGameContext();
  
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [guessWordsList, setGuessWordsList] = useState<string[]>([]);
  
  const newWordRef = useRef<string>(newWord);
  const tries = 6;
  const wordLength = 6;

  // ✅ 1️⃣ Memoización de la lógica de reset
  const resetGame = useCallback(() => {
    setGuessWord("");
    fetchNewWord();
    setGuessWordsList([]);
    setTestedWordsList([]);
    setEndGame(false);
    setIsWinner(false);
  }, [fetchNewWord, setGuessWord, setGuessWordsList, setTestedWordsList, setEndGame]);

  // ✅ 2️⃣ Sincronizar `guessWordsList` cada vez que `guessWord` cambia
  useEffect(() => {
    if (guessWord) {
      setGuessWordsList((prevList) => [
        ...prevList.slice(0, -1),
        guessWord.toLocaleUpperCase(),
      ]);
    }
  }, [guessWord]);

  // ✅ 3️⃣ Mantener `newWordRef` actualizado cuando `newWord` cambie
  useEffect(() => {
    newWordRef.current = newWord;
  }, [newWord]);

  // ✅ 4️⃣ Manejar victoria y fin del juego
  useEffect(() => {
    if (isWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
      setEndGame(true);
    } else if (testedWordsList.length === tries) {
      setEndGame(true);
      setIsWinner(false);
    }
  }, [isWinner, testedWordsList, tries, setEndGame]);

  // ✅ 5️⃣ Función para verificar si todas las letras están en la posición correcta
  const checkWin = useCallback((testWord: TestWord) => testWord.every((letter) => letter.isInPosition), []);
  
  // ✅ 6️⃣ Evaluar palabra ingresada
  useEffect(() => {
    if (guessWord.length === wordLength && newWordRef.current) {
      const testWord: TestLetter[] = checkWord(guessWord, newWordRef.current);

      setTestedWordsList((prevList) => [...prevList, testWord]);
      setGuessWordsList((prevList) => [...prevList, ""]);
      setGuessWord("");
      setIsWinner(checkWin(testWord));
    }
  }, [guessWord, wordLength, setGuessWord, setTestedWordsList, checkWin]);

  return (
    <>
      <h1 className="web-title">React Wordle</h1>

      <Board matchWord={newWord} guessWordsList={guessWordsList} length={6}>
        <div className="message-container">
          <p className="message-text">
            {isWinner && "We have a winner!"}
            {!isWinner && testedWordsList.length === tries && "You lose!"}
          </p>
        </div>
        <div className="restart-container">
          <button className="restart-button" onClick={resetGame}>
            Restart
          </button>
        </div>
      </Board>
    </>
  );
}

export default App;