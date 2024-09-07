"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Image from "next/image";
import { Button } from "../ui/button";
import { injected } from "wagmi/connectors";
import { chilizSpicy } from "@/lib/config";
import { supportedchains } from "@/lib/constants";
import FarcasterButton from "../ui/custom/farcaster-button";
export default function Navbar({ fid }: { fid: string }) {
  const { address, status, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [addressFetched, setAddressFetched] = useState(false);
  useEffect(() => {
    if (address != undefined) setAddressFetched(true);
  }, [addressFetched]);
  return (
    <div className="flex justify-between w-full px-4 pt-4">
      <Image src={"/logo.png"} width={50} height={100} alt="logo" />

      <div className="flex items-end space-x-4 my-auto">
        {addressFetched && address != undefined && (
          <FarcasterButton fid={fid} address={address} />
        )}
        <Button
          variant="default"
          onClick={() => {
            console.log("connect");
            connect({
              chainId: chilizSpicy.id,
              connector: injected(),
            });
            disconnect();
          }}
        >
          {status == "connected" ? (
            <>
              <div className="w-[20px] h-[20px] overflow-hidden relative rounded-full">
                <Image
                  src={supportedchains[chainId || chilizSpicy.id].image}
                  alt="avatar"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="ml-2">
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </p>
            </>
          ) : (
            <p>Connect Wallet </p>
          )}
        </Button>
        {/* <FarcasterButton
          fetched={fetched}
          profileImage={profileImage}
          userId={fName}
        /> */}
        {/* {status == "connected" && <ConnectKitButton theme="retro" />} */}
      </div>
    </div>
  );
}
