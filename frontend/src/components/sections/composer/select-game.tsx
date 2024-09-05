"use client";
import GameCard from "../../ui/custom/game-card";
import { games } from "@/lib/constants";
export default function SelectGame({
  setGameIndex,
  setSteps,
}: {
  setGameIndex: (index: number) => void;
  setSteps: (index: number) => void;
}) {
  return (
    <div className="flex-1 flex flex-col pt-4">
      <p className="text-center text-xl font-semibold text-foreground">
        Upcoming Fixtures
      </p>
      <p className="text-center text-sm pt-1 text-muted-foreground">
        Choose a game to post a 1v1 challenge in Farcaster
      </p>
      <div className="grid grid-cols-2 gap-4 px-8 pt-8">
        {games.map((game, index) => (
          <GameCard
            id={index}
            game={game}
            onClick={() => {
              setGameIndex(index);
              setSteps(1);
            }}
          />
        ))}
      </div>
    </div>
  );
}
