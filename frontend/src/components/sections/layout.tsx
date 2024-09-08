"use client";

interface LayoutProps {
  children: React.ReactNode;
}
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./navbar";
import Steps from "./create/Steps";

import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { chilizSpicy } from "@/lib/config";
import { Button } from "../ui/button";
import Image from "next/image";
import { injected } from "wagmi/connectors";
import { useEnvironmentContext } from "./context";

export default function Layout({ children }: LayoutProps) {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { connectAsync } = useConnect();
  const { steps, setSteps } = useEnvironmentContext();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevents rendering on the server
  }

  if (chainId != chilizSpicy.id)
    return (
      <Suspense>
        <div className="max-w-[800px] mx-auto h-screen bg-card flex flex-col">
          <Steps step={0} />
          <div className="flex-1 flex flex-col justify-center items-center">
            <Image src={"/logo.png"} width={150} height={150} alt="logo" />
            <p className="text-3xl font-bold text-stone-200 mb-12">
              cLaSh Of BaLls
            </p>
            {address != undefined && (
              <p className="my-2">You are currently in the wrong chain</p>
            )}
            <Button
              className="w-[200px] mx-auto"
              onClick={async () => {
                if (address == undefined) {
                  connectAsync({
                    chainId: chilizSpicy.id,
                    connector: injected(),
                  });
                } else {
                  await switchChainAsync({
                    chainId: chilizSpicy.id,
                  });
                }
              }}
            >
              {address == undefined ? "Connect Wallet" : "Switch Network"}
            </Button>
          </div>
        </div>
      </Suspense>
    );
  return (
    <Suspense>
      <div className="max-w-[800px] mx-auto h-screen bg-card flex flex-col">
        <Steps step={steps} />
        <NavbarComponent />
        {children}
      </div>
    </Suspense>
  );
}

function NavbarComponent() {
  const searchParams = useSearchParams();

  const fid = searchParams.get("fid");

  return <Navbar fid={fid != undefined ? fid : "-1"} />;
}
