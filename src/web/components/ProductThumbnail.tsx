import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import Icon from "./Icon";
import Price from "./Price";
import Image from "next/image";
import Link from "next/link";
import { useOrderStore } from "@lib/zustand";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Watermark from "./Watermark";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

const ProductThumbnail = ({ product, avoidLayout = false, ...props }) => {
  const addItemToCart = useOrderStore((state) => state.addItemToCart);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [isHovered, setIsHovered] = useState(false);
  const [showButtonAndPrice, setShowButtonAndPrice] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: false,
    rootMargin: "-50px 0px",
  });

  useEffect(() => {
    // Se colapsa si:
    // 1. No está en el viewport y está en mobile
    // 2. No está en mobile y no está siendo hovereado
    // 3. No está siendo hovereado y no está en el viewport
    // Se descolapsa si:
    // 1. Está en el viewport y está en mobile
    // 2. Está siendo hovereado y está en el escritorio

    if (
      (!inView && isMobile) ||
      (!isMobile && !isHovered) ||
      (!isHovered && !inView)
    ) {
      setShowButtonAndPrice(true);
    } else {
      setShowButtonAndPrice(false);
    }

    return () => {
      setShowButtonAndPrice(false);
    };
  }, [inView, isHovered]);

  return (
    <motion.div
      layout="size"
      layoutId={!avoidLayout && `product-${product.slug}`}
      ref={ref}
      className={cn(
        `relative z-[2] cursor-pointer card !p-0 rounded-[5%] shadow max-w-[180px] mx-auto overflow-hidden`,
        props?.className
      )}
      whileHover={!isMobile ? { scale: 1.025 } : {}}
      whileTap={!isMobile ? { scale: 0.975 } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      <Link
        title={`Ir a la página de sticker para tarjeta de ${product.name}`}
        href={`/stickers-para-tarjetas/${product.slug}`}
        aria-label={`Ir a la página de stickers para tarjetas de ${product.name}`}
        legacyBehavior
        className="relative w-full h-full"
      >
        <CldImage
          loading="lazy"
          quality={50}
          width={246}
          height={246 * 1.558}
          src={product?.cover?.cloudinary?.secure_url}
          blurDataURL={product?.cover?.cloudinary?.secure_url}
          placeholder="blur"
          alt={`Sticker para tarjeta de ${product.name}`}
          onLoad={() => setLoaded(true)}
          onDragStart={(e) => e.preventDefault()}
          onAuxClick={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onAuxClickCapture={(e) => e.preventDefault()}
          onDragStartCapture={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
      </Link>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 w-full h-full pointer-events-none" />
      )}

      {/* Título para SEO */}
      <h3 className="hidden">
        Sticker para tarjeta de {product.name} | Sticky Covers
      </h3>

      {/* Watermark */}
      <Watermark />

      <AnimatePresence mode="wait">
        {!showButtonAndPrice && (
          <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "100%" }}
            className="absolute bottom-0 left-0 w-full"
          >
            <motion.div className="relative w-full h-full gap-1 px-1 flex items-center justify-between">
              <Price estilo="con-etiqueta" quantity={product.price} />

              <div
                onClick={() => {
                  addItemToCart(product);
                }}
              >
                <Button
                  className="!w-auto !bg-cyan-500 p-2 shadow"
                  color={"primary"}
                  variant={"filled"}
                >
                  <Icon variant={"cart"} height={24} className="text-card" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductThumbnail;
