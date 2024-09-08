"use client";

import { useEffect, useState } from "react";
import MatchCard from "../common/match-card";
import FanTokenBalances from "../common/fan-token-balances";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FarcasterButton from "@/components/ui/custom/farcaster-button";
import { useEnvironmentContext } from "../context";
import getChallenge from "@/lib/helpers/getChallenge";
import { useToast } from "@/components/ui/use-toast";
import { createWalletClient, custom, parseEther } from "viem";
import { chilizSpicy } from "@/lib/config";
import { coreAbi, encryptedInput, supportedchains } from "@/lib/constants";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/spinner.css";
export default function Confirm({ id }: { id: string }) {
  const { setSteps, chilizPublicClient, setTx } = useEnvironmentContext();
  const [challenge, setChallege] = useState<any>(null);
  const [encrypted, setEncrypted] = useState(false);
  const [isEncryptedLoading, setIsEncryptedLoading] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [openEncryptedDataModal, setOpenEncryptedDataModal] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    getChallenge({ id }).then((res) => {
      setChallege(res.response);
    });
  }, [id]);
  if (challenge == null)
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="">
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
      <p className="pt-2 text-center text-lg font-semibold">Challenge</p>

      <MatchCard gameId={challenge.game_id} />
      <div className="flex justify-around my-5">
        <div>
          <p className="text-md font-semibold text-center mb-2">Proposed By</p>
          <Button
            variant="ghost"
            onClick={() => {
              window.open(`https://warpcast.com/${challenge.f_name}`, "_blank");
            }}
          >
            <div className="w-[20px] h-[20px] overflow-hidden relative rounded-full">
              <Image
                src={challenge.f_image}
                alt="avatar"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="ml-2">{challenge.f_name}</p>
          </Button>
        </div>
        <div>
          <p className="text-md font-semibold text-center">Proposed Amount</p>
          <div className="flex justify-center items-center mt-2 space-x-3 p-[6px] w-full">
            <p className="font-medium text-lg">{challenge.bet}</p>
            <Image
              src={"/coins/chiliz.png"}
              height={25}
              width={25}
              alt="chiliz"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <FanTokenBalances gameId={challenge.game_id} />
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
                functionName: "acceptChallenge",
                args: [challenge.id, encryptedInput],
                value: parseEther(challenge.bet.toString()),
              });
              const tx = await walletClient.writeContract(request as any);
              console.log(tx);
              setTx(tx);

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
              setSteps(3);
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
