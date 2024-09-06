"use client";

import { Card, CardContent } from "@/components/ui/card";
import { games } from "@/lib/constants";
import Image from "next/image";

export default function MatchCard({ gameId }: { gameId: any }) {
  return (
    <Card className="bg-accent my-4 pb-1 rounded-none border-none">
      <CardContent className="pb-0">
        <div className="flex justify-center pt-3">
          <Image
            src={games[gameId].league.logo}
            width={35}
            height={50}
            className="select-none"
            alt="league"
          />
        </div>
        <div className="flex justify-between space-x-2 pt-2">
          <div className="flex flex-col items-center w-[45%]">
            <div className="w-[40px] h-[40px] overflow-hidden relative">
              <Image
                src={games[gameId].home.logo}
                alt="team_home"
                width={40}
                height={40}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch  ">
                {games[gameId].home.name}
              </p>
            </div>
            <p className="text-xs text-stone-300  ">{games[gameId].home.abb}</p>
          </div>
          <p className="my-auto text-sm font-light">VS</p>
          <div className="flex flex-col items-center w-[45%]">
            <div className="w-[40px] h-[40px] overflow-hidden relative">
              <Image
                src={games[gameId].away.logo}
                alt="team_home"
                width={40}
                height={40}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch  ">
                {games[gameId].away.name}
              </p>
            </div>
            <p className="text-xs text-stone-300  ">{games[gameId].away.abb}</p>
          </div>
        </div>
        <p className="text-xs pt-4 pb-1 font-medium text-center  ">
          {games[gameId].formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}
