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
  const { setSteps, setOpenChat, setGameId } = useEnvironmentContext();
  const [challenge, setChallege] = useState<any>(null);
  useEffect(() => {
    getChallenge({ id }).then((res) => {
      console.log(res);
      setChallege(res.response);
      setGameId(res.response.game_id);
    });
  }, [id]);
  if (challenge == null)
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="">
      <p className="pt-2 text-center text-lg font-semibold">Challenge</p>

      <MatchCard gameId={challenge.game_id} />
      <div className="flex justify-around my-5">
        <div>
          <p className="text-md font-semibold text-center mb-2">Proposed By</p>
          <Button
            variant="ghost"
            onClick={() => {
              window.open(`https://warpcast.com/${challenge.f_name}`, "_blank");
            }}
          >
            <div className="w-[20px] h-[20px] overflow-hidden relative rounded-full">
              <Image
                src={challenge.f_image}
                alt="avatar"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="ml-2">{challenge.f_name}</p>
          </Button>
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

      <FanTokenBalances gameId={challenge.game_id} />

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
          Choose Predictions
        </Button>
      </div>
    </div>
  );
}
