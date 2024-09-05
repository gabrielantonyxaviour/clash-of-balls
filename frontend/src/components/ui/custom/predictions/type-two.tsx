import { useEffect, useState } from "react";
import { Input } from "../../input";
import { CarouselItem } from "../../carousel";
import { Prediction } from "@/lib/type";
import { Card, CardContent } from "../../card";
import { Separator } from "../../separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../button";
import { useEnvironmentContext } from "@/components/sections/context";
import { games } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../../badge";
export default function TypeTwo({
  index,
  pred,
}: {
  index: number;
  pred: Prediction;
}) {
  const [inputAmount, setInputAmount] = useState("0");
  const [open, setOpen] = useState(false);
  const [inputTeam, setInputTeam] = useState<boolean | null>(null);
  const predParts = pred.desc.split("_");
  const { gameId, setGameId } = useEnvironmentContext();

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
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {inputTeam == null ? (
                      <Badge className="bg-card">Choose</Badge>
                    ) : inputTeam == false ? (
                      <Badge>{games[gameId].home.name}</Badge>
                    ) : (
                      <Badge>{games[gameId].away.name}</Badge>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-xs font-semibold"
                      onClick={() => {
                        setInputTeam(false);
                      }}
                    >
                      {games[gameId].home.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-xs font-semibold"
                      onClick={() => {
                        setInputTeam(true);
                      }}
                    >
                      {games[gameId].away.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
              <Button size={"sm"}>Select</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
