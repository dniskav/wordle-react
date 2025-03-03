import React, { createContext, useState } from "react";
import { GameContextType, TestWord } from "../types/common.types";

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [testedWordsList, setTestedWordsList] = useState<TestWord[]>([]);

  return (
    <GameContext.Provider value={{ testedWordsList, setTestedWordsList }}>
      {children}
    </GameContext.Provider>
  );
};

