"use client";

import { Button } from "@/components/ui/button";
import ChoosePredictionDrawer from "@/components/ui/custom/choose-prediction-drawer";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

export default function ChoosePredictions({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [openChoosePrediction, setOpenChoosePrediction] = useState(false);
  return (
    <div>
      <ChoosePredictionDrawer
        openDrawer={openChoosePrediction}
        setOpenDrawer={setOpenChoosePrediction}
      />
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
        <p className="pt-2 text-lg">Choose Predictions</p>
        <div></div>
      </div>
      <div className="px-6 pt-4 flex flex-col space-y-3">
        <div
          className="w-full border border-dashed border-stone-500 rounded-lg h-[65px] flex justify-center items-center cursor-pointer"
          onClick={() => {
            setOpenChoosePrediction(true);
          }}
        >
          <Plus className="text-stone-500" height={20} />
        </div>
      </div>
    </div>
  );
}
