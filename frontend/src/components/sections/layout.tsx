"use client";

interface LayoutProps {
  children: React.ReactNode;
}
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "./navbar";
import { useState } from "react";
import Steps from "./create/Steps";
export default function Layout({ children }: LayoutProps) {
  const searchParams = useSearchParams();

  const fid = searchParams.get("fid");
  const [steps, setSteps] = useState(0);
  return (
    <div className="max-w-[800px] mx-auto h-screen bg-card">
      <Steps step={1} />
      <Navbar fid={fid != undefined ? fid : "-1"} />
    </div>
  );
}
