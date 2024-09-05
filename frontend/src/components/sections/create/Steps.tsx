export default function Steps({ step }: { step: number }) {
  return (
    <div className="flex  justify-between  w-[80%] mx-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className={`w-[30%] h-[8px] ${
            index < step
              ? "bg-primary"
              : "bg-transparent border-2 border-destructive"
          }     rounded-b-lg`}
        ></div>
      ))}
    </div>
  );
}
