import { memo, useEffect, useState } from "react";
import Beneficios from "./Beneficios";
import CategoryPreviewItem from "./CategoryPreviewItem";
import Centinel from "./Centinel";
import ProductThumbnail from "./ProductThumbnail";
import RotatingEmojis from "./RotatingEmojis";
import { payload } from "@/lib/payload";
import HeroIndex from "./HeroIndex";

const videoSrc =
  "https://res.cloudinary.com/stickycoverscloudinary/video/upload/v1692488768/IMG_4226_1_vyfxe5.mp4";

const OutOfViewport = ({
  productList,
  hasMore,
  loadMore,
}: {
  categories: any[];
  productList: any[];
  hasMore: boolean;
  loadMore: any;
}) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data: dataCategories } = await payload.get("/categories?");
    setCategories(dataCategories.docs);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container pt-10 space-y-6 px-0">
        <div className="flex items-center gap-2 justify-center -skew-y-3">
          <RotatingEmojis emojis={["🔥", "💳", "😍", "🍀", "🎉"]} />

          <h2 className="text-center font-bold text-xl lg:text-2xl">
            Categorías
          </h2>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-6">
          {categories?.map((category: any, i: number) => {
            return (
              <CategoryPreviewItem
                key={i}
                id={category.id}
                name={category.name}
                slug={category.slug}
                imageSrc={category.cover.cloudinary.secure_url}
                products={category.products}
              />
            );
          })}
        </div>

        <Beneficios />
      </div>

      <div className="container">
        <div className="aspect-[3/2] relative w-full md:max-w-[520px] md:max-h-none h-auto overflow-hidden block rounded-2xl mx-auto">
          {/* <ItemAnimation type={"image"} initialinview={true}> */}

          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="container grid gap-12">
        <div className="flex items-center gap-2 justify-center -skew-y-3">
          <RotatingEmojis emojis={["😱", "🌈", "👾", "😂", "💳"]} />

          <p className="text-center font-bold text-xl lg:text-2xl" id="skins">
            Todos los stickers
          </p>
        </div>

        <div className="grid gap-y-6 gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-x-6">
          {/* <pre>{JSON.stringify(productList?.[0]?.cover, null, 2)}</pre> */}
          {productList?.map((product, i) => (
            <ProductThumbnail key={`${product?.slug}-${i}`} product={product} />
          ))}
        </div>
        <Centinel refineNext={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};

export default memo(OutOfViewport);
