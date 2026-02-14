import ProductThumbnail from "@components/ProductThumbnail";
import { payload } from "@lib/payload";
import { motion } from "framer-motion";
import Head from "next/head";

const Index = ({ category }) => {
  return (
    <>
      <Head>
        <title key={"title"}>Stickers para tarjetas de {category?.name}</title>
        <meta
          name="description"
          content={`Personaliza tu tarjeta del metro o de débito con estas calcomanías de ${category?.name}`}
        />
        <meta
          name="keywords"
          content={`tarjeta metrobús, tarjeta metro, tarjeta CDMX, stickers de ${category.name}, calcomanías, tarjetas personalizada`}
        />
        <meta
          property="og:title"
          content={`Stickers para tarjetas de ${category.name}`}
        />
        <meta
          property="og:description"
          content={`Personaliza tu tarjeta del metro o de débito con estas calcomanías de ${category.name}`}
        />
        <meta
          property="og:image"
          content={category?.name?.cover?.cloudinary?.secure_url}
        />
        <meta
          property="og:url"
          content={`https://www.stickycovers.com/categorias/${category.slug}`}
        />
        {/* // canonical */}
        <link
          rel="canonical"
          href={`https://www.stickycovers.com/categorias/${category.slug}`}
        />

        <meta property="og:type" content="product.item" />
      </Head>
      <div className="container grid gap-6 py-24">
        <h1>{category.name}</h1>
        <hr />
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {category?.products?.map((product, i) => {
            return <ProductThumbnail product={product} key={i} />;
          })}
        </div>
        {/* <pre>{JSON.stringify(category, null, 2)}</pre> */}
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const { data } = await payload.get(`/categories`, {
    params: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  });

  const category = data.docs[0];

  // console.log(category);

  return {
    props: {
      category,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const categories = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await payload.get(`/categories?page=${page}`);
    categories.push(...data.docs);

    if (data.hasNextPage) {
      page++;
    } else {
      hasMore = false;
    }
  }

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default Index;
