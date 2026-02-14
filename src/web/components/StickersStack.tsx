import { useState, useEffect, memo } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

interface Sticker {
  product: {
    cover: {
      url: string;
    };
  };
}

interface StickersAccordionProps {
  stickers: Sticker[];
  maxVisibleStickers?: number;
  stickerWidth?: number;
  stickerHeight?: number;
  stickerDragElastic?: number;
  stickerDragMomentum?: boolean;
}

const StickersAccordion = ({
  stickers,
  maxVisibleStickers = 5,
  stickerWidth = 128,
  stickerHeight = 128 * 1.558,
  stickerDragElastic = 0.2,
  stickerDragMomentum = true,
}: StickersAccordionProps) => {
  const [showCount, setShowCount] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleTap = () => {
    setIsExpanded(!isExpanded);
    setShowCount(isExpanded);
  };

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="relative w-full h-24 flex gap-2 p-12 items-center justify-center overflow-x-visible"
      >
        {stickers.map((sticker, index) => (
          <motion.img
            key={index}
            src={sticker.product.cover.url}
            alt={`Sticker ${index}`}
            className={`block absolute rounded-[5%] aspect-[1/1.558] w-auto h-full shrink-0 cursor-pointer shadow`}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            dragElastic={stickerDragElastic}
            dragMomentum={stickerDragMomentum}
            onTap={handleTap}
            onDragEnd={handleTap}
            style={{
              zIndex: index + 1,
            }}
            animate={{
              rotate: isExpanded
                ? stickers.length
                  ? (index - stickers.length / 2) * 9
                  : 0
                : 0,
              x:
                (stickers.length ? index * (isExpanded ? 70 : 12) : 0) -
                ((stickers.length - 1) * (isExpanded ? 70 : 12)) / 2,
              y:
                (stickers.length ? index * (isExpanded ? -0 : -2) : 0) -
                ((stickers.length - 1) * (isExpanded ? -0 : -2)) / 2,

              scale: isExpanded ? 1 : stickers.length ? 1 - index * -0.025 : 1,
            }}
          />
        ))}

        <AnimatePresence initial mode="wait">
          {showCount && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              style={{
                zIndex: stickers.length + 2,
              }}
              className="absolute flex items-center justify-center bg-card-foreground bg-opacity-50 border-2 border-card-foreground bg-opacity-10 rounded-2xl shrink-0 text-sm py-0.5 px-1.5 shadow pointer-events-none text-card"
            >
              <span className="sr-only">{stickers.length} stickers</span>
              <span aria-hidden="true">{stickers.length} stickers</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export default memo(StickersAccordion);
