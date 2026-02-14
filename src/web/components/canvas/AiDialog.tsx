import { useGlobalStore } from "@/lib/store";
import { fetchAiImage, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription } from "../ui/dialog";
import { useEditor, AssetRecordType } from "@tldraw/tldraw";
import { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import LoadingAnimation from "../animations/LoadingAnimation";

export const AIDialog = () => {
  const [prompt, setPrompt] = useState("");
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [openPromptDialog, setOpenPromptDialog] = useGlobalStore((s) => [
    s.openPromptDialog,
    s.setOpenPromptDialog,
  ]);
  const editor = useEditor();

  const handleCreateAIImage = useCallback(async () => {
    try {
      setIsImageGenerating(true);
      const imageString = await fetchAiImage(prompt);

      setGeneratedImageUrl(imageString);

      const assetId = AssetRecordType.createId();

      const imageWidth = 1080;
      const imageHeight = 1080 * 1.5882352;

      const imageUrl = `data:image/jpeg;base64,${imageString}`;

      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: "Imagen generada",
            mimeType: "image/jpeg",
            src: imageUrl,
            w: imageWidth,
            h: imageHeight,
            isAnimated: false,
          },
          meta: {},
        },
      ]);

      editor.createShape({
        type: "image",
        x: 0,
        y: 0,
        props: {
          assetId,
          w: imageWidth,
          h: imageHeight,
        },
      });

      setIsImageGenerating(false);
      setOpenPromptDialog(false);
    } catch (err) {
      console.error("Error al generar la imagen con IA:", err);
      setIsImageGenerating(false);
    }
  }, [prompt, setGeneratedImageUrl]);

  const handleChangePrompt = (event) => {
    setPrompt(`${event.target.value}`);
  };

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  const placeholders = [
    "un gato volando",
    "varios elefantes de distintos colores",
    "un perro astronauta",
    "muchas papitas fritas",
    "un unicornio en el espacio",
    "dos patitos abrazándose",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length
      );
    }, 2500);

    return () => clearInterval(intervalId);
  }, [placeholders.length]);

  return (
    <Dialog open={openPromptDialog} onOpenChange={setOpenPromptDialog}>
      <DialogContent>
        <DialogDescription className="text-base lg:text-lg text-center">
          <span className="text-[1.5em]">Describe tu idea</span>
          <br />y créala con <b>Inteligencia Artificial</b>
        </DialogDescription>
        <input
          type="text"
          value={prompt}
          onChange={handleChangePrompt}
          // Al presionar enter, generamos la imagen
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCreateAIImage();
            }
          }}
          placeholder={placeholders[currentPlaceholderIndex]}
          className={cn(
            "w-full text-lg lg:text-xl placeholder:text-center text-center",
            isImageGenerating
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : ""
          )}
        />
        <Button
          onClick={() => {
            handleCreateAIImage();
          }}
          className="btn btn-primary"
          type="button"
          disabled={isImageGenerating}
        >
          {isImageGenerating ? <LoadingAnimation /> : "Generar imagen"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
