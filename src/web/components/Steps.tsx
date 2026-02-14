import { useGlobalStore } from "@lib/store";

const Steps = ({
  className = "",
  steps,
  actualStep,
  showLabels = true,
}: any) => {
  return (
    <div
      className={`@container w-full grid gap-6 grid-flow-col ${className}`}
      style={{
        gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
      }}
    >
      {steps.map((step: string, i: number) => {
        return (
          <div
            key={`${i}`}
            className="flex flex-col items-center w-full space-y-2"
          >
            <div
              className={`flex items-center justify-center text-2xl border rounded-full w-10 h-10   ${
                i === actualStep || actualStep > i
                  ? "bg-secondary border-secondary text-card"
                  : "border-primary bg-transparent"
              }`}
            >
              <div className="translate-y-0.5">{i + 1}</div>
            </div>
            {showLabels && (
              <p className="text-sm @md:text-base @lg:text-lg text-center">
                {step}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
