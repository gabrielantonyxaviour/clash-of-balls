import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info, Plus } from "lucide-react";
import { useState } from "react";
import { useEnvironmentContext } from "../context";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Game } from "@/lib/type";
import Image from "next/image";
import { games } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAccount, useBalance } from "wagmi";
export default function ConfirmChallenge({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [betAmount, setBetAmount] = useState(10);
  const { gameId } = useEnvironmentContext();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const [homeTokenBalance, setHomeTokenBalance] = useState(12.23);
  const [awayTokenBalance, setAwayTokenBalance] = useState(44.21);

  return (
    <div>
      <div className="flex justify-between  pt-6 px-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(0);
          }}
        >
          <ArrowLeft height={15} className="pr-1" /> Back
        </Button>
        <p className="pt-2 text-lg font-semibold">Confirm Challenge</p>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(2);
          }}
          disabled={true}
          className="bg-transparent text-transparent select-none"
        >
          Next
          <ArrowRight height={15} className="pl-1" />
        </Button>
      </div>
      <Card className="bg-accent my-4 pb-1">
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
              <p className="text-xs text-stone-300  ">
                {games[gameId].home.abb}
              </p>
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
              <p className="text-xs text-stone-300  ">
                {games[gameId].away.abb}
              </p>
            </div>
          </div>
          <p className="text-xs pt-4 pb-1 font-medium text-center  ">
            {games[gameId].formattedDate}
          </p>
        </CardContent>
      </Card>
      <div className="flex justify-between w-full items-center space-x-4 pt-2">
        <p className="px-4 font-medium text-sm  my-auto">Amount</p>
        <Slider
          defaultValue={[betAmount]}
          max={100}
          step={0.1}
          className="w-[50%]"
          value={[betAmount]}
          onValueChange={([value]) => {
            setBetAmount(value);
          }}
        />
        <div className="flex w-[25%] items-center space-x-2">
          <Input
            value={betAmount}
            className="w-[50%] bg-accent"
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (isNaN(value) || value < 0) {
                setBetAmount(0);
              } else if (value > 100) {
                setBetAmount(100);
              } else {
                setBetAmount(value);
              }
            }}
          />
          <p>CHZ</p>
        </div>
      </div>
      <div className="flex justify-between w-full items-center space-x-4 pt-4 px-4">
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
        <div className="flex space-x-1">
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
      <div className="flex justify-center pt-8">
        <Button
          onClick={() => {
            setStep(3);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
