import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/useWindowSize";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Confetti from "react-confetti";

export default function CreateChallengeSuccess() {
  const { width, height } = useWindowSize();
  const [link, setLink] = useState(
    "https://kaido-protocol.vercel.app/api/challenge/123"
  );
  const [copied, setCopied] = useState(false);

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
      <p className="text-xl font-semibold">Challenge Created! 🎉</p>
      <p className="text-xs text-stone-400 pb-5">
        Post this link in Warpcast to share your challenge!
      </p>
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
    </div>
  );
}
