"use client";

import { useEffect } from "react";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FarcasterButton from "@/components/ui/custom/farcaster-button";
import { useEnvironmentContext } from "../context";
import { ethers } from "ethers";
import { FhenixClient } from "fhenixjs";

export default function Challenge({ id }: { id: string }) {
  const { setSteps, setOpenChat } = useEnvironmentContext();

  useEffect(() => {}, [id]);
  return (
    <div className="">
      <p className="pt-2 text-center text-lg font-semibold">Challenge</p>

      <MatchCard gameId={0} />
      <div className="flex justify-around my-5">
        <div>
          <p className="text-md font-semibold text-center mb-2">Proposed By</p>
          <FarcasterButton fid={"249577"} address="0x" />
        </div>
        <div>
          <p className="text-md font-semibold text-center">Proposed Amount</p>
          <div className="flex justify-center items-center mt-2 space-x-3 p-[6px] w-full">
            <p className="font-medium text-lg">10</p>
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

      <FanTokenBalances gameId={0} />

      <div className="flex justify-center space-x-3 mt-8">
        <Button
          variant={"ghost"}
          onClick={async () => {
            const provider = new ethers.providers.JsonRpcProvider(
              "https://api.helium.fhenix.zone"
            );
            const client = new FhenixClient({ provider: provider as any });

            const { data } = await client.encrypt_uint16(10);
            const res = `0x${Array.from(data)
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("")}`;
            console.log(res);
            // setOpenChat(true);
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
