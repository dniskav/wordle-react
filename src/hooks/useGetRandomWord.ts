import { useState, useEffect, useCallback } from "react";

const getRandomWord = (words: string[]): string => 
  words[Math.floor(Math.random() * words.length)];

export default function useGetRandomWord() {
  const [newWord, setNewWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewWord = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5173/data/words.json");
      if (!response.ok) {
        throw new Error(`Error al obtener las palabras: ${response.statusText}`);
      }
      
      const data: string[] = await response.json();
      setNewWord(getRandomWord(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "omg :|");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewWord();
  }, [fetchNewWord]);

  return { newWord, fetchNewWord, loading, error };
}