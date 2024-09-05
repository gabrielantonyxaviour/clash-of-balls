import TypeZero from "./type-zero";
import TypeOne from "./type-one";
import TypeTwo from "./type-two";
import TypeThree from "./type-three";
import { useEnvironmentContext } from "@/components/sections/context";
import { predictions } from "@/lib/constants";
import { Prediction, PredictionInput } from "@/lib/type";
import { useEffect } from "react";

export default function Mapping({
  selectedIndex,
  setOpenDrawer,
  selectedPredictions,
}: {
  selectedIndex: number;
  setOpenDrawer: (open: boolean) => void;
  selectedPredictions: number[];
}) {
  const { setPredictions } = useEnvironmentContext();

  return (
    <>
      {predictions.map((pred, index) => {
        return pred.type == 0 ? (
          <TypeZero
            index={index}
            pred={pred}
            disabled={selectedPredictions.includes(index)}
            setPrediction={(ip: PredictionInput) => {
              setPredictions((prevPredictions) =>
                prevPredictions.map((prediction, i) =>
                  i === selectedIndex ? ip : prediction
                )
              );
              setOpenDrawer(false);
            }}
          />
        ) : pred.type == 1 ? (
          <TypeOne
            index={index}
            pred={pred}
            disabled={selectedPredictions.includes(index)}
            setPrediction={(ip: PredictionInput) => {
              setPredictions((prevPredictions) =>
                prevPredictions.map((prediction, i) =>
                  i === selectedIndex ? ip : prediction
                )
              );
              setOpenDrawer(false);
            }}
          />
        ) : pred.type == 2 ? (
          <TypeTwo
            index={index}
            pred={pred}
            disabled={selectedPredictions.includes(index)}
            setPrediction={(ip: PredictionInput) => {
              setPredictions((prevPredictions) =>
                prevPredictions.map((prediction, i) =>
                  i === selectedIndex ? ip : prediction
                )
              );
              setOpenDrawer(false);
            }}
          />
        ) : (
          <TypeThree
            index={index}
            pred={pred}
            disabled={selectedPredictions.includes(index)}
            setPrediction={(ip: PredictionInput) => {
              setPredictions((prevPredictions) =>
                prevPredictions.map((prediction, i) =>
                  i === selectedIndex ? ip : prediction
                )
              );
              setOpenDrawer(false);
            }}
          />
        );
      })}
    </>
  );
}
