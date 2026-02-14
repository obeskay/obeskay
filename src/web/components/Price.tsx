import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface PriceProps {
  quantity: number;
  size?: "sm" | "md";
  className?: string;
  estilo?: "default" | "con-etiqueta";
}

const constructClassName = (size: string, estilo: string) => {
  const sizeClass = size === "sm" ? "text-lg" : "text-xl";
  switch (estilo) {
    case "default":
      return cn(`text-sm text-card-foreground`, sizeClass);
    case "con-etiqueta":
      return cn(`text-lg text-card mx-1 my-2`, sizeClass);
    default:
      return "";
  }
};

const Price: React.FC<PriceProps> = ({
  quantity,
  size = "md",
  className = "",
  estilo = "default",
}) => {
  return (
    <div
      className={cn(
        `relative flex items-center text-card`,
        className,
        constructClassName(size, estilo)
      )}
    >
      {estilo === "default" ? (
        <>
          <span className="text-sm">MXN</span>
          <span className="flex items-center font-bold">
            <span className="text-lg">$</span>
            <span>{quantity}</span>
          </span>
        </>
      ) : (
        <>
          <div className="absolute aspect-square h-10 -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2">
            <Image
              src="/etiquetaPrecio.svg"
              alt="Etiqueta de precio"
              width={310}
              height={310}
              className={`shadow`}
              blurDataURL="/etiquetaPrecio.svg"
              placeholder="blur"
            />
          </div>
          <div className="relative flex items-center font-bold mt-2">
            <span className="text-sm -ml-px">$</span>
            <span>{quantity}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Price);
