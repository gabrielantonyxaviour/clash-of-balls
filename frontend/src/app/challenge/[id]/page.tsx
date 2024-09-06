import Challenge from "@/components/sections/challenge/page";

export const metadata = {
  title: "Challenge | Clash of Balls",
  description: "Interact with a challenge in clash of Balls.",
};

export default function ChallengePage({ params }: { params: { id: string } }) {
  return <Challenge id={params.id} />;
}
