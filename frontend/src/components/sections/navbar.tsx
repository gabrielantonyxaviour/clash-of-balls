"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useQuery } from "@airstack/airstack-react";
import { Data, QueryResponse } from "@/lib/airstackInterface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { injected } from "wagmi/connectors";
import { chilizSpicy } from "@/lib/config";
import { supportedchains } from "@/lib/constants";
export default function Navbar({ fid }: { fid: string }) {
  const { address, status, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [fetched, setFetched] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [fName, setFName] = useState("");
  const [localFid, setLocalFid] = useState("-1");
  const {
    data,
    loading,
    error: queryError,
  }: QueryResponse = useQuery<Data>(
    fid != "-1"
      ? `  query MyQuery {
  Socials(
    input: {filter: {dappName: {_eq: farcaster}, userId: {_eq: "${fid}"}}, blockchain: ethereum}
  ) {
    Social {
      profileImage
      profileHandle
      userId
    }
  }
}`
      : address != undefined
      ? ` query MyQuery {
  Socials(
    input: {blockchain: ethereum, filter: {dappName: {_eq: farcaster}, identity: {_eq: "${address}"}}}
  ) {
    Social {
      profileImage
      profileHandle
      userId
    }
  }
}`
      : ``,
    {},
    { cache: false }
  );
  useEffect(() => {
    console.log("HI");
    if (
      data != null &&
      (data as any).Socials != null &&
      (data as any).Socials.Social != null &&
      (data as any).Socials.Social.length > 0
    ) {
      setProfileImage((data as any).Socials.Social[0].profileImage);
      setFName((data as any).Socials.Social[0].profileHandle);
      console.log(data);
      setLocalFid(fid);
      setFetched(true);
    } else {
      console.log("No profile found");
      console.log(data);
    }
  }, [data, loading, queryError]);
  return (
    <div className="flex justify-between w-full px-4 pt-4">
      <Image src={"/logo.png"} width={50} height={100} alt="logo" />

      <div className="flex items-end space-x-4 my-auto">
        {localFid != "-1" && (
          <Button
            variant="ghost"
            onClick={() => {
              window.open(`https://warpcast.com/${fName}`, "_blank");
            }}
          >
            <div className="w-[20px] h-[20px] overflow-hidden relative rounded-full">
              <Image
                src={profileImage}
                alt="avatar"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="ml-2">{fName}</p>
          </Button>
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
