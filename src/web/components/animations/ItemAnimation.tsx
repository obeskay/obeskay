import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  imageAnimation,
  imageWrapperAnimation,
  itemAnimation,
  imageZoomOutAnimation,
} from "../../lib/animations";

interface ItemAnimationProps {
  initialinview?: boolean;
  type: "heroImage" | "image" | "item";
  i?: number;
  inverted?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ItemAnimation = ({
  initialinview = false,
  className,
  children,
  ...props
}: ItemAnimationProps) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50px 0px",
    initialInView: initialinview,
  });

  useEffect(() => {
    if (inView || initialinview) {
      controls.start("show");
    }
  }, [inView, controls, initialinview]);

  switch (props.type) {
    case "heroImage":
      return (
        <motion.div
          ref={ref}
          animate={controls}
          variants={imageWrapperAnimation(props?.i || 0)}
          initial={`hidden`}
          className={`relative h-full overflow-hidden ${className}`}
          {...props}
        >
          <motion.div
            animate={controls}
            variants={imageZoomOutAnimation(props?.i || 0)}
            initial={`hidden`}
            className="relative w-full h-full"
          >
            {children}
          </motion.div>
        </motion.div>
      );
    case "image":
      return (
        <motion.div
          ref={ref}
          animate={controls}
          variants={
            props.inverted
              ? imageWrapperAnimation(props?.i || 0)
              : imageWrapperAnimation(props?.i || 0)
          }
          initial={`hidden`}
          className={`relative h-full overflow-hidden flex ${className}`}
          {...props}
        >
          <motion.div
            animate={controls}
            variants={
              props.inverted
                ? imageAnimation(props?.i || 0)
                : imageAnimation(props?.i || 0)
            }
            initial={`hidden`}
            className="relative flex w-full h-full"
          >
            {children}
          </motion.div>
        </motion.div>
      );
    case "item":
      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            animate={controls}
            variants={itemAnimation(props?.i || 0)}
            initial={`hidden`}
            className={`relative flex ${className}`}
            transition={{
              duration: 0,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
    default:
      return null;
  }
};

export default ItemAnimation;
