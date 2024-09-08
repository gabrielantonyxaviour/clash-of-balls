import ChallengePage from "@/components/sections/challenge/page";

export const metadata = {
  title: "Challenge | Clash of Balls",
  description: "Interact with a challenge in clash of Balls.",
};

export default function Page({ params }: { params: { id: string } }) {
  return <ChallengePage id={params.id} />;
}
