import { predictions } from "@/lib/constants";
import TypeZero from "./type-zero";
import TypeOne from "./type-one";
import TypeTwo from "./type-two";
import TypeThree from "./type-three";

export default function Mapping() {
  return (
    <>
      {predictions.map((pred, index) => {
        return pred.type == 0 ? (
          <TypeZero index={index} pred={pred} />
        ) : pred.type == 1 ? (
          <TypeOne index={index} pred={pred} />
        ) : pred.type == 2 ? (
          <TypeTwo index={index} pred={pred} />
        ) : (
          <TypeThree index={index} pred={pred} />
        );
      })}
    </>
  );
}
