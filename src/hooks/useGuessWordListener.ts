import { useEffect, useRef, useState } from 'react';

export default function useGuessWordListener(wordLength: number) {
  const [guessWord, setGuessWord] = useState<string>('');
  const [endGame, setEndGame] = useState<boolean>(false);
  const guessWordRef = useRef<string>(guessWord);

  useEffect(() => {
    guessWordRef.current = guessWord;
  }, [guessWord]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setGuessWord((currentWord) => currentWord.slice(0, -1));
        return
      }

      if (guessWordRef.current.length >= wordLength) {
        return;
      }

      if (/^[A-Za-z]$/.test(event.key)) {
        if(!endGame){
          setGuessWord((currentWord) => currentWord + event.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [wordLength, endGame]);

  return { guessWord, setGuessWord, setEndGame };
}
