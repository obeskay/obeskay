import { AnimatePresence, motion } from "framer-motion";
import LoadingAnimation from "./LoadingAnimation";

const OverlayLoader = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
        }}
        className="fixed inset-0 h-[100dvh] w-[100dvw] bg-card-foreground/20 flex items-center justify-center text-card z-[99999999]"
      >
        <div className="shrink-0 scale-[2] pointer-events-none">
          <LoadingAnimation />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OverlayLoader;
