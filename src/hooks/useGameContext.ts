import { useContext } from "react";
import { GameContext } from "../store/gameContext";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext debe usarse dentro de un <GameProvider>");
  }
  return context;
};