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
    <Card className="bg-primary cursor-pointer hover:-translate-y-1 hover:scale-105 hover:bg-white duration-300 transition ease-in-out delay-120 group">
      <CardContent>
        <div className="flex justify-center pt-3">
          <Image
            src={game.league.logo}
            width={30}
            height={50}
            className="select-none"
            alt="team_away"
          />
        </div>
        <div className="flex justify-between px-4">
          <div className="flex flex-col items-center w-[45%]">
            <div className="w-[80px] h-[80px] overflow-hidden relative">
              <Image
                src={game.home.logo}
                alt="team_home"
                width={50}
                height={50}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch group-hover:text-primary">
                {game.home.name}
              </p>
            </div>
            <p className="text-xs text-stone-300 group-hover:text-primary">
              {game.home.abb}
            </p>
          </div>
          <div className="flex flex-col items-center w-[45%]">
            <Image
              src={game.away.logo}
              width={80}
              height={50}
              alt="team_away"
              className="select-none"
            />
            <div className="pt-2 w-full overflow-hidden">
              <p className="font-semibold text-center whitespace-nowrap overflow-x-auto scrollbar-none -webkit-overflow-scrolling-touch group-hover:text-primary">
                {game.away.name}
              </p>
            </div>
            <p className="text-xs text-stone-300 group-hover:text-primary">
              {game.away.abb}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-center group-hover:text-primary">
          {game.formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}
