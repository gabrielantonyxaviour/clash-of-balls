import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/useWindowSize";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useEnvironmentContext } from "../context";

export default function ChallengeAcceptedSuccess({ id }: { id: string }) {
  const { width, height } = useWindowSize();
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { tx } = useEnvironmentContext();

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
      <p className="text-xl font-semibold pb-4">Challenge Accepted! 🎉</p>

      {id != "" ? (
        <Button
          className="hover:bg-transparent"
          onClick={() => {
            window.open("https://testnet.chiliscan.com/tx/" + tx, "_blank");
          }}
        >
          View Tx
        </Button>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}
