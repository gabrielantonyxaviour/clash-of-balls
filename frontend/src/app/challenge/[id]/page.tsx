import ChallengePage from "@/components/sections/challenge/page";
import dynamic from "next/dynamic";
const XmtpChatWrapper = dynamic(
  () => import("@/components/sections/xmtp-chat-wrapper"),
  {
    ssr: false,
  }
);
export const metadata = {
  title: "Challenge | Clash of Balls",
  description: "Interact with a challenge in clash of Balls.",
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <XmtpChatWrapper />
      <ChallengePage id={params.id} />
    </>
  );
}
