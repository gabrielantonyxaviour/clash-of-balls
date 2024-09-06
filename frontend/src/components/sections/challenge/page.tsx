"use client";

import { useEffect } from "react";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Challenge({ id }: { id: string }) {
  useEffect(() => {}, [id]);
  return (
    <div className="">
      <p className="pt-2 text-center text-lg font-semibold">Challenge</p>

      <MatchCard gameId={0} />
      <p className="text-md font-semibold text-center px-4">Proposed Amount</p>
      <div className="flex justify-center items-center mt-2 space-x-3 p-[6px] w-full">
        <p className="font-bold text-xl">10</p>
        <Image
          src={"/coins/chiliz.png"}
          height={30}
          width={30}
          alt="chiliz"
          className="rounded-full"
        />
      </div>

      <FanTokenBalances gameId={0} />

      <div className="flex justify-center space-x-3 mt-12">
        <Button variant={"ghost"}>Negotiate</Button>
        <Button>Accept</Button>
      </div>
    </div>
  );
}
