import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { games } from "@/lib/constants";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function FanTokenBalances({ gameId }: { gameId: number }) {
  const [homeTokenBalance, setHomeTokenBalance] = useState(12.23);
  const [awayTokenBalance, setAwayTokenBalance] = useState(44.21);

  return (
    <div className="flex justify-between w-full items-center space-x-4 pt-4 px-5 ">
      <div className="flex space-x-2">
        <p className=" font-medium text-sm my-auto">Fan Token Balances</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-stone-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm p-3">
                Holding more fan tokens than <br /> your opponent provides{" "}
                <span className="text-primary font-bold">5%</span> discount{" "}
                <br />
                in the stake with the same winning rewards.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex space-x-1 px-6">
        <Image
          src={games[gameId].home.logo}
          width={25}
          height={25}
          className="select-none"
          alt="home"
        />
        <p className="text-sm font-semibold my-auto pr-6">
          {homeTokenBalance} {games[gameId].home.abb}
        </p>
        <Image
          src={games[gameId].away.logo}
          width={25}
          height={25}
          className="select-none"
          alt="away"
        />
        <p className="text-sm font-semibold my-auto">
          {awayTokenBalance} {games[gameId].away.abb}
        </p>
      </div>
    </div>
  );
}
