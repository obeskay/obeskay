import { cva, type VariantProps } from "class-variance-authority";

export const baseToolClassName = cva(
  "w-8 h-8 rounded-2xl flex items-center justify-center transition duration-25",
  {
    variants: {
      variant: {
        default: "cursor-pointer bg-gray-100 text-card-foreground",
        selected: "bg-secondary text-white",
        disabled: "bg-transparent opacity-25 cursor-not-allowed",
      },
    },
  }
);

export const baseToolIconClassName = cva("h-5 shrink-0 text-current", {
  variants: {},
});
