import { usePathname } from "next/navigation";

export default function Steps({ step }: { step: number }) {
  const pathName = usePathname();
  return (
    <div
      className={` ${
        pathName == "/" ? "flex" : "hidden"
      }  justify-between  w-[80%] mx-auto`}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className={`w-[30%] h-[8px] ${
            index < step
              ? "bg-primary"
              : "bg-transparent border-2 border-accent"
          }     rounded-b-lg`}
        ></div>
      ))}
    </div>
  );
}
