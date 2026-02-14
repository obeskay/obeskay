"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useMeasure from "react-use-measure"; // Import react-use-measure
import { Button } from "./button";
import PagaSeguroCard from "../PagaSeguroCard";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 10);
  const secondRow = products.slice(10, 20);
  const thirdRow = products.slice(20, 30);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 160, damping: 24, bounce: 25 };
  const [measureRef, { height, width }] = useMeasure();

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [width, -width / 2]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-width, width / 2]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-height, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0.125, 1]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] overflow-hidden relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        ref={measureRef}
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="z-[-1] flex flex-col space-y-12  w-full h-full relative"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-12 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="container flex flex-col justify-center items-center space-y-10 w-full h-full pt-[16.5dvh]">
      {/* <ItemAnimation type="item" initialinview={true} i={0}> */}
      <h1 className="flex text-center font-bold flex-col items-center w-full space-y-0 text-primary text-displayMobile md:text-displayDesktop -skew-y-3">
        <span>
          Stickers para{" "}
          {/* {process.env.NODE_ENV !== "production" && process.env.NODE_ENV} */}
        </span>
        <span className="text-card-foreground">tarjetas</span>
      </h1>
      {/* </ItemAnimation> */}
      <div className="grid grid-cols-2 md:flex gap-2 sm:gap-4">
        {/* <ItemAnimation type="item" initialinview={true} i={1}> */}
        <a
          href="#skins"
          aria-label="Ir a los modelos de stickers para tarjetas"
          className="flex"
        >
          <Button color="primary">Ver modelos</Button>
        </a>
        {/* </ItemAnimation> */}
        {/* <ItemAnimation type="item" initialinview={true} i={2}> */}
        <Link
          href="/crea-tu-sticker"
          aria-label="Personaliza tus stickers para tarjetas con tus propias fotos"
          className="flex"
        >
          <Button color="secondary">Crea el tuyo</Button>
        </Link>
        {/* </ItemAnimation> */}
      </div>
      <div className="mx-auto">
        <PagaSeguroCard />
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-auto w-[25vh] aspect-stickerInverted relative flex-shrink-0 card p-0 rounded-2xl overflow-hidden"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-t from-black/50 via-black/0 to-black/0 pointer-events-none transition-all"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
