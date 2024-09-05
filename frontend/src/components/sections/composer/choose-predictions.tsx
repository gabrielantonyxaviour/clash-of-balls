"use client";

import { Button } from "@/components/ui/button";
import ChoosePredictionDrawer from "@/components/ui/custom/predictions/choose-prediction-drawer";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { useEnvironmentContext } from "../context";

export default function ChoosePredictions({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [openChoosePrediction, setOpenChoosePrediction] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { predictions, setPredictions } = useEnvironmentContext();
  return (
    <div>
      <ChoosePredictionDrawer
        openDrawer={openChoosePrediction}
        setOpenDrawer={setOpenChoosePrediction}
        selectedIndex={selectedIndex}
        selectedPredictions={predictions.map((pred) => pred.index)}
      />
      <div className="flex justify-between  pt-6 px-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(0);
          }}
        >
          <ArrowLeft height={15} className="pr-1" /> Back
        </Button>
        <p className="pt-2 text-lg font-semibold">Choose Predictions</p>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(2);
          }}
          disabled={!predictions.every((pred) => pred.index != -1)}
        >
          Next
          <ArrowRight height={15} className="pl-1" />
        </Button>
      </div>
      <div className="px-6 pt-4 flex flex-col space-y-3">
        {predictions.map((pred, index) =>
          pred.index == -1 ? (
            <div
              className="w-full border border-dashed border-stone-500 rounded-lg h-[65px] flex justify-center items-center cursor-pointer"
              onClick={() => {
                setOpenChoosePrediction(true);
                setSelectedIndex(index);
              }}
            >
              <Plus className="text-stone-500" height={20} />
            </div>
          ) : (
            <div
              className="w-full border bg-accent rounded-lg h-[65px] flex justify-between space-x-4 items-center cursor-pointer px-4"
              onClick={() => {
                setPredictions((prev) =>
                  prev.map((p) =>
                    p.index == pred.index
                      ? { index: -1, params: [], resultantDesc: "" }
                      : p
                  )
                );
              }}
            >
              <p className="text-md font-semibold">{pred.resultantDesc}</p>
              <Button size={"sm"}>Remove</Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
