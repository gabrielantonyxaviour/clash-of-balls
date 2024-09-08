import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useEnvironmentContext } from "../context";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

import { useAccount, useBalance } from "wagmi";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import { createWalletClient, custom, parseEther } from "viem";
import { chilizSpicy } from "@/lib/config";
import { coreAbi, supportedchains } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import createChallenge from "@/lib/helpers/createChallenge";
export default function ConfirmChallenge({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [betAmount, setBetAmount] = useState(10);
  const { gameId, chilizPublicClient, setTx, fName, fImage, setChallengeId } =
    useEnvironmentContext();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { toast } = useToast();

  return (
    <div>
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
        <p className="pt-2 text-lg font-semibold">Confirm Challenge</p>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(2);
          }}
          disabled={true}
          className="bg-transparent text-transparent select-none"
        >
          Next
          <ArrowRight height={15} className="pl-1" />
        </Button>
      </div>
      <MatchCard gameId={gameId} />
      <div className="flex justify-around w-full items-center space-x-4 pt-2 mx-auto">
        <p className="px-4 font-medium text-sm  my-auto">Amount</p>
        <Slider
          defaultValue={[betAmount]}
          max={100}
          step={0.1}
          className="w-[50%]"
          value={[betAmount]}
          onValueChange={([value]) => {
            setBetAmount(value);
          }}
        />
        <div className="flex max-w-[25%] items-center space-x-2">
          <Input
            value={betAmount}
            className="w-[40%] bg-accent"
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (isNaN(value) || value < 0) {
                setBetAmount(0);
              } else if (value > 100) {
                setBetAmount(100);
              } else {
                setBetAmount(value);
              }
            }}
          />
          <p>CHZ</p>
        </div>
      </div>
      <FanTokenBalances gameId={gameId} />
      <div className="flex justify-center pt-8">
        <Button>Encrypt</Button>
      </div>
      <div className="flex justify-center pt-8">
        <Button
          onClick={async () => {
            const encryptedInput = [
              "0xabcdef1234567890abcdef1234567890abcdef12",
              [
                "0x4a3b2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3f4a5b6c7d8e",
                "0x9c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3ca5b6c7d8e9f0a",
                "0x1a2b3c4d5e6f7a8b9c0d1e2f3d4e5f60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
                "0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fe7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9ce3c2c1d5e6f7a8b9c0d1e2f2f3d4e",
                "0x7b8c9d0e1f2a3b4c5d6e7f8a9b0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9ce1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7b0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
              ],
              [
                "0x7b8c9d0e1f28b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3f4a5b6c7d8e",
                "0x3c4d5e6f7a80e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3ca5b6c7d8e9f0a",
              ],
              [
                "0x4a3b2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3f4a5b6c7d8e",
                "0x9c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3ca5b6c7d8e9f0a",
                "0x1a2b3c4d5e6f7a8b9c0d1e2f3d4e5f60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
              ],
              [
                "0x4a3b2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3f4a5b6c7d8e",
                "0x9c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3ca5b6c7d8e9f0a",
                "0x1a2b3c4d5e6f7a8b9c0d1e2f3d4e5f60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
                "0x4a3b2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3f4a5b6c7d8e",
                "0x9c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c2c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0c1d2e3ca5b6c7d8e9f0a",
                "0x1a2b3c4d5e6f7a8b9c0d1e2f3d4e5f60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
                "0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d60d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2fe7f8a9b0c1d2e3f42c1d5e6f7a8b9c0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9ce3c2c1d5e6f7a8b9c0d1e2f2f3d4e",
                "0x7b8c9d0e1f2a3b4c5d6e7f8a9b0d1e2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f42c1d5e6f7a8b9ce1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7be1f2a3b4c5d60d1e2f3d4e5f6a7b0d1e2f3d4e5f6a7b8c9d0e7f8a9b0ce3c2c1d5e6f7a8b9c0d1e2f0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
              ],
            ];
            if (chilizPublicClient == null) return;
            const walletClient = createWalletClient({
              chain: chilizSpicy,
              transport: custom(window.ethereum!),
            });
            const [account] = await walletClient.getAddresses();
            try {
              const { request } = await chilizPublicClient.simulateContract({
                account,
                address: supportedchains[chilizSpicy.id].core,
                abi: coreAbi,
                functionName: "createChallenge",
                args: [
                  gameId,
                  parseEther(betAmount.toString()),
                  encryptedInput,
                ],
                value: parseEther(betAmount.toString()),
              });
              const tx = await walletClient.writeContract(request as any);
              console.log(tx);
              setTx(tx);
              const { response } = await createChallenge({
                gameId: gameId.toString(),
                fName,
                fImage,
                bet: betAmount.toString(),
              });
              console.log("SUPABASE RESPONSE");
              console.log(response);

              setChallengeId(response.id);
              toast({
                title: "Create Challenge Confirmed",
                description: "Transaction Sent Successfully",
                action: (
                  <ToastAction altText="Goto schedule to undo">
                    <Link
                      target="_blank"
                      href={`https://testnet.chiliscan.com/tx/` + tx}
                    >
                      View
                    </Link>
                  </ToastAction>
                ),
              });
              setStep(3);
            } catch (e) {
              console.log(e);
              toast({
                title: "Create Challenge Failed",
                description: "Transaction Failed",
              });
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
