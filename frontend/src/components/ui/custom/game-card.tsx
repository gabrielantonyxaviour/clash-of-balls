import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LOGOS } from "@/lib/constants";
import { Game } from "@/lib/type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Card className="bg-accent cursor-pointer hover:-translate-y-1 hover:scale-105 hover:bg-primary duration-300 transition ease-in-out delay-120 group">
      <CardContent className="pb-0">
        <div className="flex justify-center pt-3">
          <Image
            src={game.league.logo}
            width={25}
            height={50}
            className="select-none"
            alt="league"
          />
        </div>
        <div className="flex justify-between space-x-2 pt-2">
          <div className="flex flex-col items-center w-[45%]">
            <div className="w-[40px] h-[40px] overflow-hidden relative">
              <Image
                src={game.home.logo}
                alt="team_home"
                width={40}
                height={40}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch  ">
                {game.home.name}
              </p>
            </div>
            <p className="text-xs text-stone-300  ">{game.home.abb}</p>
          </div>
          <p className="my-auto text-sm font-light">VS</p>
          <div className="flex flex-col items-center w-[45%]">
            <div className="w-[40px] h-[40px] overflow-hidden relative">
              <Image
                src={game.away.logo}
                alt="team_home"
                width={40}
                height={40}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch  ">
                {game.away.name}
              </p>
            </div>
            <p className="text-xs text-stone-300  ">{game.away.abb}</p>
          </div>
        </div>
        <p className="text-xs pt-4 pb-1 font-medium text-center  ">
          {game.formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}
