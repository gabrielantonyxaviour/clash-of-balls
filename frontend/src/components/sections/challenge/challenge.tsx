"use client";

import { useEffect, useState } from "react";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FarcasterButton from "@/components/ui/custom/farcaster-button";
import { useEnvironmentContext } from "../context";
import getChallenge from "@/lib/helpers/getChallenge";

export default function Challenge({ id }: { id: string }) {
  const { setSteps, setOpenChat } = useEnvironmentContext();
  const [challenge, setChallege] = useState<any>(null);
  useEffect(() => {
    getChallenge({ id }).then((res) => {
      setChallege(res.response);
    });
  }, [id]);
  return (
    <div className="">
      <p className="pt-2 text-center text-lg font-semibold">Challenge</p>

      <MatchCard gameId={challenge.gameId} />
      <div className="flex justify-around my-5">
        <div>
          <p className="text-md font-semibold text-center mb-2">Proposed By</p>
          <FarcasterButton fid={challenge.f_id} address="0x" />
        </div>
        <div>
          <p className="text-md font-semibold text-center">Proposed Amount</p>
          <div className="flex justify-center items-center mt-2 space-x-3 p-[6px] w-full">
            <p className="font-medium text-lg">{challenge.bet}</p>
            <Image
              src={"/coins/chiliz.png"}
              height={25}
              width={25}
              alt="chiliz"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <FanTokenBalances gameId={challenge.gameId} />

      <div className="flex justify-center space-x-3 mt-8">
        <Button
          variant={"ghost"}
          onClick={async () => {
            setOpenChat(true);
          }}
        >
          Negotiate
        </Button>
        <Button
          onClick={() => {
            setSteps(1);
          }}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
