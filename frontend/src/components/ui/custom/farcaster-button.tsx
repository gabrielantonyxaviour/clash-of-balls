import { useQuery } from "@airstack/airstack-react";
import { Data, QueryResponse } from "@/lib/airstackInterface";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "../button";
import Image from "next/image";
import { useEnvironmentContext } from "@/components/sections/context";

export default function FarcasterButton({
  fid,
  address,
}: {
  fid: string;
  address: string;
}) {
  const { fName, setFName, setFImage, fImage } = useEnvironmentContext();
  const [localFid, setLocalFid] = useState("-1");
  const [fetched, setFetched] = useState(false);
  const query =
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
      : ` query MyQuery {
  Socials(
    input: {blockchain: ethereum, filter: {dappName: {_eq: farcaster}, identity: {_eq: "${address}"}}}
  ) {
    Social {
      profileImage
      profileHandle
      userId
    }
  }
}`;
  const {
    data,
    loading,
    error: queryError,
  }: QueryResponse = useQuery<Data>(query, {}, { cache: false });
  useEffect(() => {
    console.log("HI");
    console.log(fid);
    if (
      data != null &&
      (data as any).Socials != null &&
      (data as any).Socials.Social != null &&
      (data as any).Socials.Social.length > 0
    ) {
      setFImage((data as any).Socials.Social[0].profileImage);
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
    localFid != "-1" && (
      <Button
        variant="ghost"
        onClick={() => {
          window.open(`https://warpcast.com/${fName}`, "_blank");
        }}
      >
        <div className="w-[20px] h-[20px] overflow-hidden relative rounded-full">
          <Image
            src={fImage}
            alt="avatar"
            width={20}
            height={20}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="ml-2">{fName}</p>
      </Button>
    )
  );
}
