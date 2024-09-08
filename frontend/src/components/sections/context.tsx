import { ExtendedProvider, PredictionInput } from "@/lib/type";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { FhenixClient } from "fhenixjs";
import { ethers } from "ethers";

interface BalanceContextType {
  predictions: PredictionInput[];
  setPredictions: React.Dispatch<React.SetStateAction<PredictionInput[]>>;
  gameId: number;
  setGameId: (gameId: number) => void;
  steps: number;
  setSteps: (step: number) => void;
  openChat: boolean;
  setOpenChat: (openChat: boolean) => void;
  fhenixClient: FhenixClient | null;
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
      resultantDesc: "",
      params: [],
    },
    {
      index: -1,
      resultantDesc: "",
      params: [],
    },
    {
      index: -1,
      resultantDesc: "",
      params: [],
    },
    {
      index: -1,
      resultantDesc: "",
      params: [],
    },
    {
      index: -1,
      resultantDesc: "",
      params: [],
    },
  ]);
  const [gameId, setGameId] = useState<number>(-1);
  const [steps, setSteps] = useState<number>(0);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [fhenixClient, setFhenixClient] = useState<FhenixClient | null>(null);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(
      window.ethereum
    ) as ExtendedProvider;
    const client = new FhenixClient({ provider: provider });
  }, []);
  return (
    <BalanceContext.Provider
      value={{
        predictions,
        setPredictions,
        gameId,
        setGameId,
        steps,
        setSteps,
        openChat,
        setOpenChat,
        fhenixClient,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
