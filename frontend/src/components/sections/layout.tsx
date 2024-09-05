"use client";

interface LayoutProps {
  children: React.ReactNode;
}
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./navbar";
import { useState } from "react";
import Steps from "./create/Steps";

import SelectGame from "./select-game";

export default function Layout({ children }: LayoutProps) {
  const [steps, setSteps] = useState(0);
  const [gameIndex, setGameIndex] = useState(-1);
  return (
    <Suspense>
      <div className="max-w-[800px] mx-auto h-screen bg-card flex flex-col">
        <Steps step={steps} />
        <NavbarComponent />
        {steps === 0 ? (
          <SelectGame setGameIndex={setGameIndex} setSteps={setSteps} />
        ) : (
          <div>{children}</div>
        )}
      </div>
    </Suspense>
  );
}

function NavbarComponent() {
  const searchParams = useSearchParams();

  const fid = searchParams.get("fid");

  return <Navbar fid={fid != undefined ? fid : "-1"} />;
}
