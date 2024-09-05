"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ChoosePredictions({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between relative pt-6">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(0);
          }}
          className="absolute"
        >
          <ArrowLeft height={15} className="pr-1" /> Back
        </Button>
        <div></div>
        <p className="pt-2 text-xl">Choose Predictions</p>
        <div></div>
      </div>
    </div>
  );
}
