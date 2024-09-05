"use client";

interface LayoutProps {
  children: React.ReactNode;
}
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./navbar";
import { useState } from "react";
import Steps from "./create/Steps";
import { Card } from "../ui/card";
import GameCard from "../ui/custom/game-card";
import { games } from "@/lib/constants";

export default function Layout({ children }: LayoutProps) {
  const [steps, setSteps] = useState(0);
  return (
    <Suspense>
      <div className="max-w-[800px] mx-auto h-screen bg-card flex flex-col">
        <Steps step={1} />
        <NavbarComponent />
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-center text-2xl font-semibold text-foreground">
            Upcoming Fixtures
          </p>
          <p className="text-center text-sm pt-1 text-muted-foreground">
            Choose a game to post a 1v1 challenge in Farcaster
          </p>
          <div className="grid grid-cols-2 gap-4 px-8 pt-12">
            {games.map((game) => (
              <GameCard game={game} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function NavbarComponent() {
  const searchParams = useSearchParams();

  const fid = searchParams.get("fid");

  return <Navbar fid={fid != undefined ? fid : "-1"} />;
}
