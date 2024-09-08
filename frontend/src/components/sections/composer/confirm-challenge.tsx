import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useEnvironmentContext } from "../context";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAccount, useBalance } from "wagmi";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import { createWalletClient, custom, parseEther } from "viem";
import { chilizSpicy } from "@/lib/config";
import { coreAbi, encryptedInput, supportedchains } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import createChallenge from "@/lib/helpers/createChallenge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [encrypted, setEncrypted] = useState(false);
  const [isEncryptedLoading, setIsEncryptedLoading] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [openEncryptedDataModal, setOpenEncryptedDataModal] = useState(false);
  return (
    <div>
      <Dialog
        open={openEncryptedDataModal}
        onOpenChange={(p) => {
          setOpenEncryptedDataModal(p);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Encrypted Prediction</DialogTitle>
            <DialogDescription className="text-xs">
              Your challenge is encrypted and stored on chain and will be
              decrypted to compute results once the match is over.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 text-sm break-all">
            {encryptedInput[0] +
              ", " +
              encryptedInput[1][0] +
              ", " +
              encryptedInput[1][1] +
              ", " +
              encryptedInput[1][2]}
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between  pt-6 px-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            setStep(1);
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
      <div className="flex justify-center pt-8 items-center">
        <Button
          disabled={encrypted || isEncryptedLoading}
          className="my-2 bg-accent"
          variant={"outline"}
          onClick={() => {
            setIsEncryptedLoading(true);
            setTimeout(() => {
              setEncrypted(true);
              setIsEncryptedLoading(false);
            }, 8000);
          }}
        >
          {isEncryptedLoading ? (
            <div className="spinner"></div>
          ) : (
            <p>Encrypt</p>
          )}
        </Button>
        {encrypted && (
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => {
              setOpenEncryptedDataModal(true);
            }}
          >
            View
          </Button>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!encrypted || isEncryptedLoading}
          onClick={async () => {
            if (chilizPublicClient == null) return;
            setIsTxLoading(true);
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
            setIsTxLoading(false);
          }}
        >
          {isTxLoading ? <div className="spinner"></div> : <p>Submit</p>}
        </Button>
      </div>
    </div>
  );
}
