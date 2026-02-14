import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useThreeStore } from "@lib/store";

import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import LogoStickyCovers from "@components/LogoStickyCovers";

import Link from "next/link";
import { payload } from "@lib/payload";
import ItemAnimation from "@/components/animations/ItemAnimation";

const CardSeleccionDiseño = dynamic(
  () => import("@components/canvas/CardSeleccionDiseño"),
  {
    ssr: false,
  }
);
const ThreeCanvas = dynamic(() => import("@components/canvas/ThreeCanvas"), {
  ssr: false,
});

const RiveBackground = dynamic(
  () => import("@components/animations/RiveBackground"),
  {
    ssr: false,
  }
);

const validationSchema = Yup.object().shape({
  image: Yup.mixed(),
});

const Index = (props) => {
  // Extrae los skins populares de los props
  const { skinsPopulares } = props;

  const formRef: any = useRef();

  const [cardProgresoContentRef, cardProgresoContentBounds]: any = useMeasure();

  const [
    getTexture,
    setTextureUrl,
    setIsLoadingTexture,
    setShowStickerSelector,
  ]: any = useThreeStore(
    // Modificamos el nombre del estado
    "getTexture, setTextureUrl, setIsLoadingTexture, setShowStickerSelector"
  );

  const handleSubmit = async (values: { image: File }, { setSubmitting }) => {
    // Se activa el loader
    setIsLoadingTexture(true);

    setShowStickerSelector(false);
    // Si la imagen no es válida, no se hace nada
    if (!values.image) return;

    // Si la imagen es válida, se obtiene la textura
    const textureImageUrl = await getTexture(values.image);

    // Si la textura es válida, se actualiza el estado de la textura
    if (textureImageUrl) {
      setTextureUrl(textureImageUrl);
    }

    // Se desactiva el loader
    setIsLoadingTexture(false);

    // Se desactiva el botón de submit
    setSubmitting(false);
  };

  const handleDropAccepted = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (formRef.current) {
        formRef.current.setFieldValue("image", acceptedFiles[0]);
        formRef.current.submitForm();
      }
    }
  };

  // desactiva el elastic scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.position = "fixed";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.position = "relative";
    };
  }, []);

  return (
    <motion.div className="relative w-screen h-[100dvh] overflow-hidden">
      {/* Rive */}
      <div className="absolute inset-0 z-[-1]">
        <div className="relative w-full h-full">
          <RiveBackground />
        </div>
      </div>

      <div className="absolute container py-4 z-10">
        <div className="relative flex items-center justify-between w-full h-full text-card">
          <Link href="/">
            <LogoStickyCovers className=" h-16" />
          </Link>
          <h1>Crea tu diseño</h1>
        </div>
      </div>

      <div className="absolute h-[100dvh] w-screen overflow-hidden inset-0 flex-grow">
        <ThreeCanvas />
      </div>

      <CardSeleccionDiseño diseños={skinsPopulares} />
    </motion.div>
  );
};

export const getStaticProps = async () => {
  const skins = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await payload.get(`/products?page=${page}`);
    skins.push(...data.docs);

    if (data.hasNextPage) {
      page++;
    } else {
      hasMore = false;
    }
  }

  return {
    props: {
      skinsPopulares: skins,
    },
    revalidate: 60,
  };
};

export default Index;
