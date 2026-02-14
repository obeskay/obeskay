import { useState, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";

const StickersAccordion = ({ stickers }) => {
  const [visibleStickers, setVisibleStickers] = useState([]);
  const [hiddenStickers, setHiddenStickers] = useState([]);
  const [showCount, setShowCount] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (stickers.length > 5) {
      setVisibleStickers(stickers.slice(0, 5));
      setHiddenStickers(stickers.slice(5));
      setShowCount(true);
    } else {
      setVisibleStickers(stickers);
      setHiddenStickers([]);
      setShowCount(false);
    }
  }, [stickers]);

  const handleTap = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="relative w-full"
      onTap={handleTap}
      style={{
        height: isExpanded ? "auto" : "24px",
        overflow: "hidden",
      }}
    >
      <LayoutGroup>
        {visibleStickers.map((sticker, index) => (
          <motion.img
            layout
            key={index}
            src={sticker.product.cover.url}
            alt={`Sticker ${index}`}
            className="absolute rounded-[5%] max-h-full shrink-0"
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            dragElastic={0.2}
            whileHover={{
              scale: 1.1,
              zIndex: 2,
            }}
            whileTap={{
              scale: 0.9,
            }}
            style={{
              zIndex: index + 1,
              rotate: -10 + index * 12.5,
              margin: "0 0 0 -12px",
            }}
            animate={{
              marginLeft: `${-index * 24}px`,
              y: isExpanded ? 0 : (index % 2 ? -1 : 1) * 5,
            }}
          />
        ))}
      </LayoutGroup>
      {showCount && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            zIndex: 3,
            margin: "0 0 0 -12px",
          }}
        >
          <span className="sr-only">
            Plus {hiddenStickers.length} more stickers
          </span>
          <span aria-hidden="true">+{hiddenStickers.length}</span>
        </div>
      )}
    </motion.div>
  );
};

export default StickersAccordion;
