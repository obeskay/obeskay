/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { memo, useEffect, useRef } from "react";

const InfiniteTextAnounce = ({ content, className = "", duration = 20 }) => {
  const textArray = [...Array(4)];
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let requestId;

    const animation = () => {
      requestId = requestAnimationFrame(animation);
      container.style.transform = `translateX(-1px)`;
    };

    animation();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className={cn("!-skew-y-3", className)}>
      <div className="mask-borders flex max-w-full flex-grow flex-row items-center overflow-y-visible overflow-x-hidden">
        {textArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ translateX: "0" }}
            animate={{ translateX: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: duration,
              stiffness: 0,
              ease: "linear",
              repeatDelay: 0,
            }}
            className="relative inline-flex justify-center items-center gap-12 px-8 h-[auto] py-4 font-title text-xl shrink-0"
            //Previene que lo lean los lectores de seo
            aria-hidden={i > 0}
          >
            <motion.div className="inline-block text-xl">{content}</motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default memo(InfiniteTextAnounce);
