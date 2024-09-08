"use client";

import ChallengeAcceptedSuccess from "@/components/sections/challenge/challenge-accepted";
import Challenge from "@/components/sections/challenge/challenge";
import { useEnvironmentContext } from "@/components/sections/context";
import ChoosePredictions from "../composer/choose-predictions";
import Confirm from "./confirm";

export default function ChallengePage({ id }: { id: string }) {
  const { steps, setSteps } = useEnvironmentContext();
  return steps == 0 ? (
    <Challenge id={id} />
  ) : steps == 1 ? (
    <ChoosePredictions setStep={setSteps} />
  ) : steps == 2 ? (
    <Confirm id={id} />
  ) : (
    <ChallengeAcceptedSuccess />
  );
}
