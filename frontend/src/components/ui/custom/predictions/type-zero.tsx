import { CarouselItem } from "../../carousel";
import { Prediction, PredictionInput } from "@/lib/type";
import { Card, CardContent } from "../../card";
import { Separator } from "../../separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../button";

export default function TypeZero({
  index,
  pred,
  setPrediction,
  disabled,
}: {
  index: number;
  pred: Prediction;
  setPrediction: (ip: PredictionInput) => void;
  disabled: boolean;
}) {
  return (
    <CarouselItem
      key={index}
      className={`pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div className="p-1">
        <Card className="bg-accent ">
          <CardContent className="flex flex-col h-[200px] items-center justify-between p-0 pb-3">
            <p className="text-center my-auto text-sm px-8">{pred.desc}</p>
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
                disabled={disabled}
                onClick={() => {
                  setPrediction({
                    index: index,
                    resultantDesc: pred.desc,
                    params: [],
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
