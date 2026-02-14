import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Button = ({ className = "", ...props }) => {
  const defaultTransition = {
    duration: 0.3,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  const buttonAnimation = {
    default: {
      scale: 1,
      transition: defaultTransition,
    },
    hover: {
      scale: 1.025,
      transition: defaultTransition,
    },
    tap: {
      scale: 0.95,
      transition: defaultTransition,
    },
  };
  let variantClassName = "";

  switch (props.color) {
    case "primary":
      switch (props.variant) {
        case "filled":
          variantClassName = "bg-primary text-card";
          break;
        case "outlined":
          variantClassName = `border-primary text-card-foreground border`;
          break;
      }
      break;
    case "secondary":
      switch (props.variant) {
        case "filled":
          variantClassName = "bg-secondary text-card";
          break;
        case "outlined":
          variantClassName = `border-secondary text-card-foreground border`;
          break;
      }
      break;
    case "light":
      switch (props.variant) {
        case "filled":
          variantClassName = `bg-card text-card-foreground`;
          break;
        case "outlined":
          variantClassName = `border-card text-card-foreground border`;
          break;
      }
      break;
  }

  return (
    <motion.button
      variants={buttonAnimation}
      whileHover="hover"
      whileTap="tap"
      className={cn(
        `flex justify-center items-center w-full md:w-auto mx-0 md:mx-auto btn ${variantClassName} ${
          props.disabled ? "opacity-50" : "opacity-100"
        } ${className}`
      )}
      {...props}
    >
      <span className="-skew-y-3">{props.children}</span>
    </motion.button>
  );
};

export default Button;
