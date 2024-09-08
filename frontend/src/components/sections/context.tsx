import { chilizSpicy } from "@/lib/config";
import { ExtendedProvider, PredictionInput } from "@/lib/type";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createPublicClient, http, PublicClient } from "viem";

interface BalanceContextType {
  predictions: PredictionInput[];
  setPredictions: React.Dispatch<React.SetStateAction<PredictionInput[]>>;
  gameId: number;
  setGameId: (gameId: number) => void;
  steps: number;
  setSteps: (step: number) => void;
  openChat: boolean;
  setOpenChat: (openChat: boolean) => void;
  chilizPublicClient: PublicClient | null;
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
  const [chilizPublicClient, setChilizPublicClient] =
    useState<PublicClient | null>(null);

  useEffect(() => {
    const client = createPublicClient({
      chain: chilizSpicy,
      transport: http(),
    });
    setChilizPublicClient(client);
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
        chilizPublicClient,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
