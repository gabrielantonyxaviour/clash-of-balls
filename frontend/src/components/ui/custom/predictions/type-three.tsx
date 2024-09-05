import { useState } from "react";
import { Input } from "../../input";
import { CarouselItem } from "../../carousel";
import { Prediction, PredictionInput } from "@/lib/type";
import { Card, CardContent } from "../../card";
import { Separator } from "../../separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../button";
import { useEnvironmentContext } from "@/components/sections/context";
import { games } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../../badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerCard from "./player-card";
import { ScrollArea } from "../../scroll-area";
export default function TypeThree({
  index,
  pred,
  setPrediction,
}: {
  index: number;
  pred: Prediction;
  setPrediction: (ip: PredictionInput) => void;
}) {
  const [inputAmount, setInputAmount] = useState("0");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputPlayerId, setInputPlayerId] = useState<number | null>(null);
  const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<boolean>(false);
  const predParts = pred.desc.split("_");
  const { gameId } = useEnvironmentContext();

  return (
    <CarouselItem
      key={index}
      className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6"
    >
      <div className="p-1">
        <Card className="bg-accent ">
          <CardContent className="flex flex-col h-[200px] items-center justify-between p-0 pb-3">
            <p className="text-center my-auto text-sm px-4">
              {predParts[0]}
              <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                <Dialog
                  open={openDialog}
                  onOpenChange={(op) => setOpenDialog(op)}
                >
                  <DialogTrigger>
                    {inputPlayerId == null ? (
                      <Badge className="bg-card">Choose</Badge>
                    ) : (
                      <Badge>
                        {
                          games[gameId][!selectedPlayerTeam ? "home" : "away"]
                            .players[inputPlayerId].player.name
                        }
                      </Badge>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Choose Player
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs
                      defaultValue={selectedPlayerTeam.toString()}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value={"false"}
                          onClick={() => {
                            setSelectedPlayerTeam(false);
                          }}
                        >
                          {games[gameId].home.name}
                        </TabsTrigger>
                        <TabsTrigger
                          value={"true"}
                          onClick={() => {
                            setSelectedPlayerTeam(true);
                          }}
                        >
                          {games[gameId].away.name}
                        </TabsTrigger>
                      </TabsList>
                      <ScrollArea className="h-[250px] pr-2">
                        <div className=" grid grid-cols-2 gap-2 mx-2 pt-4">
                          {games[gameId][
                            !selectedPlayerTeam ? "home" : "away"
                          ].players.map((player, index) => (
                            <PlayerCard
                              key={index}
                              player={player}
                              onClick={() => {
                                setInputPlayerId(index);
                                setOpenDialog(false);
                              }}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </span>
              {predParts[1]}
              <span>
                <Input
                  value={inputAmount}
                  onChange={(e) => {
                    if (e.target.value.length == 0)
                      setInputAmount(e.target.value);
                    else {
                      let value = parseInt(e.target.value, 10);
                      if (isNaN(value) || value < -1) {
                        setInputAmount("0");
                      } else if (value > 10) {
                        setInputAmount("10");
                      } else {
                        setInputAmount(value.toString());
                      }
                    }
                  }}
                  className="inline h-6 ring-none w-10"
                />
              </span>
              {predParts[2]}
            </p>
            <Separator className="bg-card h-[1px] mb-4 mt-2" />
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="hover:bg-card"
                  >
                    Points
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] bg-card">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <p>Base points</p>
                      <p>{pred.basePoints}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Multiplier</p>
                      <p>{pred.multiplier}x</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                size={"sm"}
                disabled={
                  inputAmount == "" ||
                  inputAmount == "0" ||
                  inputPlayerId == null
                }
                onClick={() => {
                  setPrediction({
                    index: index,
                    resultantDesc:
                      predParts[0] +
                      games[gameId][!selectedPlayerTeam ? "home" : "away"]
                        .players[inputPlayerId || 0].player.name +
                      predParts[1] +
                      inputAmount +
                      predParts[2],
                    params: [(inputPlayerId || 0).toString(), inputAmount],
                  });
                }}
              >
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
