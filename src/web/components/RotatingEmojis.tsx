import { useState, useEffect, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingEmojisProps {
  emojis: string[];
}

const RotatingEmojis = ({ emojis }: RotatingEmojisProps) => {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [emojis.length]);

  return (
    <div className="h-12 w-12 flex items-center justify-center text-2xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentEmojiIndex}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: -0.125,
            },
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          {emojis[currentEmojiIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default memo(RotatingEmojis);
