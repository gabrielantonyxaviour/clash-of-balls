"use client";

import ChallengeAcceptedSuccess from "@/components/sections/challenge/challenge-accepted";
import Challenge from "@/components/sections/challenge/challenge";
import { useEnvironmentContext } from "@/components/sections/context";

export default function ChallengePage({ id }: { id: string }) {
  const { steps } = useEnvironmentContext();
  return steps == 0 ? <Challenge id={id} /> : <ChallengeAcceptedSuccess />;
}
