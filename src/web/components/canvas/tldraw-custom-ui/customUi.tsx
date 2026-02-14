import { track, useEditor } from "@tldraw/tldraw";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { getSelectionAsImageDataUrl } from "./lib/getSelectionAsImageDataUrl";
import { useGlobalStore } from "@/lib/store";
import { useOrderStore } from "@/lib/zustand";

const CustomUI = track(({ children }) => {
  const addItemToCart = useOrderStore((state) => state.addItemToCart);
  const editor = useEditor();
  const [lienzoId, setIsLoadingOverlay] = useGlobalStore((s) => [
    s.lienzoId,
    s.setIsLoadingOverlay,
  ]);

  const generarProductoDesdeDiseño = async () => {
    setIsLoadingOverlay(true);
    let resStickerArmado;
    try {
      const canvas = editor.select(lienzoId);
      const image = await getSelectionAsImageDataUrl(canvas);
      const imageBlob = await (await fetch(image)).blob();

      const formData = new FormData();
      formData.append("image", imageBlob);

      resStickerArmado = await fetch(`/api/armarSticker`, {
        method: "POST",
        body: formData,
      });
      try {
        const stickerBlob = await resStickerArmado.blob();

        // Crea un nuevo form data para crear el producto en Payload
        const formDataDos = new FormData();
        formDataDos.append("image", stickerBlob);

        const resProducto = await fetch(`/api/payload/designToProduct`, {
          method: "POST",
          body: formDataDos, // Reutilizar el formData si es el mismo
        }).then((res) => res.json());

        // Agrega el producto al carrito
        addItemToCart(resProducto?.data?.product);

        setIsLoadingOverlay(false);
      } catch (error) {
        console.error("❌: ", error);
        setIsLoadingOverlay(false);
      }
    } catch (error) {
      console.error("🎯: ", error);
      setIsLoadingOverlay(false);
    }
  };

  return (
    <div className="pointer-events-none w-screen fixed inset-0 flex flex-col z-[999] h-[100dvh]">
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        <div
          className="pointer-events-auto"
          onClick={generarProductoDesdeDiseño}
        >
          <Button type="button" color="primary">
            Continuar
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
});

export default memo(CustomUI);
