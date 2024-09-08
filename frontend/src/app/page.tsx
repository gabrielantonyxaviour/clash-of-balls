"use client";
import SelectGame from "@/components/sections/composer/select-game";
import ChoosePredictions from "@/components/sections/composer/choose-predictions";
import { useEnvironmentContext } from "@/components/sections/context";
import ConfirmChallenge from "@/components/sections/composer/confirm-challenge";
import { useState } from "react";
import CreateChallengeSuccess from "@/components/sections/composer/create-challenge-success";
export default function Page() {
  const { gameId, setGameId, setPredictions, steps, setSteps } =
    useEnvironmentContext();
  return steps === 0 ? (
    <SelectGame setGameIndex={setGameId} setSteps={setSteps} />
  ) : steps == 1 ? (
    <ChoosePredictions setStep={setSteps} />
  ) : steps == 2 ? (
    <ConfirmChallenge setStep={setSteps} />
  ) : (
    <CreateChallengeSuccess />
  );
}
