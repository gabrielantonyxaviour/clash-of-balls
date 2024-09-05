import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Mapping from "./predictions/mapping";

export default function ChoosePredictionDrawer({
  openDrawer,
  setOpenDrawer,
  selectedIndex,
}: {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  selectedIndex: number;
}) {
  return (
    <>
      <Drawer
        open={openDrawer}
        onOpenChange={(open) => {
          setOpenDrawer(open);
        }}
      >
        <DrawerContent className="h-[300px]">
          <Carousel className="w-full max-w-md md:max-w-2xl lg:max-w-5xl m-auto">
            <CarouselContent className="-ml-2">
              <Mapping
                selectedIndex={selectedIndex}
                setOpenDrawer={setOpenDrawer}
              />
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DrawerContent>
      </Drawer>
    </>
  );
}
