import CaretLeft from "@phosphor-icons/react/dist/icons/CaretLeft";
import CaretRight from "@phosphor-icons/react/dist/icons/CaretRight";
import { motion } from "framer-motion";

const SwiperArrows = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          translateY: "-50%",
        }}
        whileHover={{
          scale: 1.1,
          translateY: "-50%",
        }}
        whileTap={{
          scale: 0.9,
          translateY: "-50%",
        }}
        className="absolute opacity-0 top-1/2 left-4 custom-swiper-button-prev h-8 w-8 flex items-center justify-center shadow bg-card rounded-full z-10 cursor-pointer"
      >
        <CaretLeft className="text-card-foreground" />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          translateY: "-50%",
        }}
        whileHover={{
          scale: 1.1,
          translateY: "-50%",
        }}
        whileTap={{
          scale: 0.9,
          translateY: "-50%",
        }}
        className="absolute opacity-0 top-1/2 right-4 custom-swiper-button-next h-8 w-8 flex items-center justify-center shadow bg-card rounded-full z-10 cursor-pointer"
      >
        <CaretRight className="text-card-foreground" />
      </motion.div>
    </>
  );
  return (
    <div>
      {renderPrevArrow()}
      {renderNextArrow()}
    </div>
  );
};

const commonClasses = `absolute top-1/2 -translate-y-1/2 z-[1] h-[24px] w-[24px] flex items-center justify-center rounded-2xl bg-card-foreground bg-opacity-20 border border-card-foreground bg-opacity-10 cursor-pointer`;

const renderPrevArrow = () => (
  <div className={`swiper-button-prev left-2 ${commonClasses}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-card"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        // strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

const renderNextArrow = () => (
  <div className={`swiper-button-next right-2 ${commonClasses}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-card"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default SwiperArrows;
