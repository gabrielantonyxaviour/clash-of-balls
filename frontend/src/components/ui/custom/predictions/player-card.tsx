import { PlayerStruct } from "@/lib/type";

export default function PlayerCard({
  key,
  player,
  onClick,
}: {
  key: number;
  player: PlayerStruct;
  onClick: () => void;
}) {
  return (
    <div
      key={key}
      className="bg-card flex py-3 px-2 rounded-md space-x-2 cursor-pointer hover:bg-primary hover:-translate-y-1 hover:scale-105 duration-300 transition ease-in-out delay-120"
      onClick={onClick}
    >
      <div className="rounded-full bg-secondary p-2 flex justify-center items-center h-8 w-8 text-xs">
        {player.player.number}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold">{player.player.name}</p>
        <p className="text-xs text-muted-foreground">
          {player.player.pos == "G"
            ? "GoalKeeper"
            : player.player.pos == "D"
            ? "Defender"
            : player.player.pos == "M"
            ? "Midfielder"
            : "Forward"}
        </p>
      </div>
    </div>
  );
}
