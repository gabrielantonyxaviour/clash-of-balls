import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEnvironmentContext } from "./context";
import { useAccount } from "wagmi";
import Image from "next/image";
import { handleLogout, initXmtpWithKeys } from "@/lib/helpers/xmtp";
import {
  useCanMessage,
  useClient,
  useStartConversation,
} from "@xmtp/react-sdk";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import { ethers, Signer } from "ethers";
export default function XmtpChat() {
  const { address } = useAccount();
  const [thinking, setThinking] = useState(false);
  const [chatMessage, setChatMessage] = useState<string>("");
  const { setOpenChat, openChat } = useEnvironmentContext();
  const [convos, setConvos] = useState<{ sender: string; message: string }[]>(
    []
  );
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const {
    client,
    initialize: initializeXmtp,
    disconnect: disconnectXmtp,
    isLoading: isXmtpLoading,
  } = useClient();
  const { canMessage } = useCanMessage();
  const { startConversation } = useStartConversation();

  useEffect(() => {
    if (address == undefined) return;
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setSigner(provider.getSigner());
  }, [address]);
  useEffect(() => {
    const initialIsOnNetwork =
      localStorage.getItem("isOnNetwork") === "true" || false;

    setIsOnNetwork(initialIsOnNetwork);
  }, []);

  useEffect(() => {
    if (address == undefined) return;
    localStorage.setItem("isOnNetwork", isOnNetwork.toString());
    localStorage.setItem("isConnected", ((address as string) != "").toString());
  }, [address, isOnNetwork]);
  useEffect(() => {
    if (client && !isOnNetwork) {
      setIsOnNetwork(true);
    }
    if (signer && isOnNetwork) {
      initXmtpWithKeys(signer, initializeXmtp);
    }
  }, [address, signer, client]);
  return (
    <Sheet>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="relative">
            <ArrowRight
              className="h-10 w-10 absolute -left-9 bg-background border-[1px]  p-2 text-WHITE cursor-pointer rounded-lg"
              onClick={() => {
                setOpenChat(false);
              }}
            />
          </SheetTitle>
          <SheetDescription className="h-screen">
            <div
              className={`h-screen my-auto pt-6 flex flex-col bg-background ${
                address == undefined || !isOnNetwork
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              {address == undefined ? (
                <Button
                  onClick={() => {
                    open();
                  }}
                >
                  Connect Wallet
                </Button>
              ) : !isOnNetwork ? (
                <Button
                  disabled={isXmtpLoading}
                  onClick={() => {
                    console.log("WHAT");
                    if (signer == null) return;
                    initXmtpWithKeys(signer, initializeXmtp);
                  }}
                >
                  {isXmtpLoading ? (
                    <div className="black-spinner"></div>
                  ) : (
                    <>
                      <Image
                        src="/xmtp.png"
                        width={25}
                        height={25}
                        alt="xmtp"
                      />
                      <p>Connect with XMTP</p>{" "}
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <div className="flex justify-center space-x-2 -translate-y-8 rounded-sm text-sm font-semibold items-center select-none">
                    <Image src="/xmtp.png" width={25} height={25} alt="xmtp" />
                    <p>{address.slice(0, 8) + "...." + address.slice(-6)}</p>
                  </div>
                  <Button
                    variant={"ghost"}
                    className="hover:bg-transparent -translate-y-8"
                    onClick={() => {
                      handleLogout(signer, setIsOnNetwork, disconnectXmtp);
                    }}
                  >
                    Log out
                  </Button>
                  <ScrollArea className="h-[80%] flex flex-col space-y-2 no-scrollbar -translate-y-2">
                    {convos.map((convo, id) => (
                      <div
                        key={id}
                        className={`flex text-xs ${
                          convo.sender != address
                            ? "justify-start"
                            : "justify-end"
                        } items-center space-x-2 my-1`}
                      >
                        {convo.sender != address && (
                          <Image
                            src={"/logo-square.png"}
                            width={25}
                            height={25}
                            alt="logo"
                          />
                        )}
                        <Card className="max-w-[70%]">
                          <CardContent className="py-2 px-3">
                            <p className="">{convo.message}</p>
                          </CardContent>
                        </Card>
                        {convo.sender == address && (
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={"/avatar.jpeg"} alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex mx-auto pt-4 w-full  px-2">
                    <Input
                      type="text"
                      disabled={
                        convos.length == 0 ||
                        convos[convos.length - 1].sender == address ||
                        thinking
                      }
                      value={chatMessage}
                      onChange={(e) => {
                        setChatMessage(e.target.value);
                      }}
                      placeholder="Enter your prompt"
                      className="text-xs sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    />
                    <Button
                      className="ml-2"
                      size={"sm"}
                      disabled={
                        convos.length == 0 ||
                        convos[convos.length - 1].sender == address ||
                        thinking
                      }
                      onClick={async () => {
                        const currentConvo = {
                          sender: address as string,
                          message: chatMessage,
                        };
                        try {
                          setConvos([...convos, currentConvo]);
                          await startConversation(
                            "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D",
                            chatMessage
                          );
                          // const response = await axios.post("/api/classify", {
                          //   message: prompt,
                          // });
                          // console.log(response.data);
                          // if (
                          //   response.data.success == false ||
                          //   (response.data.response.response.length == 0 &&
                          //     response.data.response.action.length == 0)
                          // )
                          //   throw new Error("Error in response");
                          setChatMessage("");
                          // if (response.data.response.action != "")
                          //   setAction(response.data.response.action);

                          // if (response.data.response.params != "") {
                          //   setActionParams(response.data.response.params);
                          //   setOpenAi(false);
                          // }

                          // setConvos([
                          //   ...convos,
                          //   currentConvo,
                          //   {
                          //     id: (convos.length + 2).toString(),
                          //     isAI: true,
                          //     message:
                          //       response.data.response.response == ""
                          //         ? "Here you go!"
                          //         : response.data.response.response,
                          //   },
                          // ]);

                          // setClassifyResponse(response.data.response);
                        } catch (e) {
                          console.log(e);
                          setConvos([
                            ...convos,
                            currentConvo,
                            {
                              sender: "AI", // TODO: Change this to the other player address
                              message:
                                "Sorry, Something went wrong. Can you try again later?",
                            },
                          ]);
                        }
                      }}
                    >
                      <Icons.rightArrow className="h-3 w-3 fill-current" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
