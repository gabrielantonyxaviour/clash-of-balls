import { PredictionInput } from "@/lib/type";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BalanceContextType {
  predictions: PredictionInput[];
  setPredictions: (prediction: PredictionInput[]) => void;
  gameId: number;
  setGameId: (gameId: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useEnvironmentContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error(
      "useEnvironmentContext must be used within a BalanceProvider"
    );
  }
  return context;
};

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [predictions, setPredictions] = useState<PredictionInput[]>([
    {
      index: -1,
      params: [],
    },
    {
      index: -1,
      params: [],
    },
    {
      index: -1,
      params: [],
    },
    {
      index: -1,
      params: [],
    },
    {
      index: -1,
      params: [],
    },
  ]);
  const [gameId, setGameId] = useState<number>(-1);
  return (
    <BalanceContext.Provider
      value={{
        predictions,
        setPredictions,
        gameId,
        setGameId,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
