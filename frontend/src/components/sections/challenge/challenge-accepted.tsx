import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/useWindowSize";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useEnvironmentContext } from "../context";

export default function ChallengeAcceptedSuccess() {
  const { width, height } = useWindowSize();
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { tx, challengeId } = useEnvironmentContext();

  useEffect(() => {
    if (challengeId) {
      setLink(
        `https://kaido-protocol-frames.vercel.app/challenge/${challengeId}`
      );
    }
  }, [challengeId]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  return (
    <div className="flex flex-col h-full justify-center items-center px-4">
      <Confetti width={width} height={height} />
      <p className="text-xl font-semibold">Challenge Accepted! 🎉</p>
      <p className="text-xs text-stone-400 pb-5">
        Post this link as a reply to the challenge in Warpcast!
      </p>
      {challengeId != "" ? (
        <>
          <div className="flex justify-center">
            <Input
              id="link"
              value={link}
              readOnly
              className="w-[320px] text-xs bg-accent"
            />
            <Button
              size="sm"
              className="px-3 mx-2"
              onClick={() => {
                handleCopy();
              }}
            >
              <span className="sr-only"> {copied ? "Copied!" : "Copy"}</span>
              {copied ? (
                <Copy className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => {
              window.open("https://testnet.chiliscan.com/tx/" + tx, "_blank");
            }}
          >
            View Tx
          </Button>
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}
