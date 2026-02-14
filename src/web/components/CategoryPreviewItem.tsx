import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import ProductThumbnail from "./ProductThumbnail";
import { Autoplay, EffectCards } from "swiper";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button";
import { memo } from "react";

interface CategoryPreviewItemProps {
  id: string;
  name: string;
  slug: string;
  imageSrc: string;
  products: any[];
}

const CategoryPreviewItem = ({
  id,
  name,
  slug,
  imageSrc,
  products,
}: CategoryPreviewItemProps) => {
  return (
    <div className="@container group flex flex-row gap-x-4 items-center">
      <Link
        href={`/categorias/${slug}`}
        aria-label="Ir a la página de categorías"
        className="card space-y-4 group-odd:order-last flex flex-col !p-0 overflow-clip w-full"
      >
        <div className="aspect-video relative pt-4 pb-12 flex items-center justify-center text-center group-odd:bg-secondary/10 group-odd:text-secondary group-even:bg-primary/10 group-even:text-primary w-full ">
          <h2 className="-skew-y-3 scale-[0.9]">
            <span className="hidden">Stickers para tarjetas de </span>
            {name}
          </h2>
        </div>
        <Swiper
          className="relative w-48 @md:w-64 !px-6 @lg:!px-4 !-mt-[18%]"
          effect={"cards"}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[EffectCards, Autoplay]}
        >
          {products.slice(0, 6).map((product: any, i: number) => {
            return (
              <SwiperSlide key={i} className="rounded-[5%]">
                <ProductThumbnail product={product} avoidLayout />
              </SwiperSlide>
            );
          })}
          {/* <SwiperArrows /> */}
        </Swiper>
        <div className="p-4 pt-0">
          <Button color="secondary" variant="outlined">
            Ver más
          </Button>
        </div>
      </Link>

      {/* <pre>
        {JSON.stringify(
          {
            id,
            name,
            slug,
            imageSrc,
            products,
          },
          null,
          2
        )}
      </pre> */}
    </div>
  );
};

export default memo(CategoryPreviewItem);
