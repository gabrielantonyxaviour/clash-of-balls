import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useEnvironmentContext } from "../context";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

import { useAccount, useBalance } from "wagmi";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
export default function ConfirmChallenge({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [betAmount, setBetAmount] = useState(10);
  const { gameId, fhenixClient } = useEnvironmentContext();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });

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
      <MatchCard gameId={gameId} />
      <div className="flex justify-around w-full items-center space-x-4 pt-2 mx-auto">
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
        <div className="flex max-w-[25%] items-center space-x-2">
          <Input
            value={betAmount}
            className="w-[40%] bg-accent"
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
      <FanTokenBalances gameId={gameId} />
      <div className="flex justify-center pt-8">
        <Button
          onClick={async () => {
            if (fhenixClient === null) return;
            const { data } = await fhenixClient.encrypt_uint16(10);
            const res = `0x${Array.from(data)
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("")}`;
            console.log(res);
          }}
        >
          Encrypt
        </Button>
      </div>{" "}
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
