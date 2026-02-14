import {
  FrameShapeUtil,
  Tldraw,
  createShapeId,
  useActions,
  useEditor,
} from "@tldraw/tldraw";
import RiveBackground from "./animations/RiveBackground";
import { useToPng } from "@hugocxl/react-to-image";
import Button from "./Button";
import { useCallback, useEffect } from "react";

export default function Editor() {
  const [_, convert, ref] = useToPng<HTMLDivElement>({
    quality: 0.8,

    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = data;
      link.ariaLabel = "Descargar imagen";
      link.click();
    },
  });
  return (
    <div className="fixed inset-0 bg-secondary">
      <Tldraw
        autoFocus
        overrides={{
          toolbar(_app, toolbar, { tools }) {
            // Vamos a filtrar los items del toolbar que aparezcan en este listado
            const blacklistIds = [
              "line",
              "laser",
              "highlight",
              "frame",
              "arrow-right",
              "arrow-left",
              "arrow-up",
              "arrow-down",
              "check-box",
              "x-box",
              "oval",
              "star",
              "hexagon",
              "pentagon",
              "rhombus",
              "trapezoid",
              "triangle",
              "diamond",
              "ellipse",
              "rectangle",
              "note",
              "arrow",
            ];
            toolbar = toolbar.filter((item) => {
              return !blacklistIds.includes(item.id);
            });
            return toolbar;
          },
        }}
      >
        <InsideEditorContext />
      </Tldraw>
      {true && (
        <div className="absolute inset-0 z-[0] mix-blend-hard-light pointer-events-none">
          <div className="relative w-full h-full grayscale">
            <RiveBackground />
          </div>
        </div>
      )}
      {/* <div className="absolute inset-0 overflow-hidden w-screen h-[100dvh] flex items-center justify-center pointer-events-none z-[-1]">
        <div
          ref={ref}
          className="relative rounded-2xl bg-white aspect-sticker w-full h-auto max-w-[calc(100%-5rem)] md:max-w-lg"
        ></div>
      </div> */}
    </div>
  );
}

const InsideEditorContext = () => {
  const editor = useEditor();

  const lienzoId = createShapeId("lienzo");

  const { "export-as-png": exportAsPng } = useActions();

  const exportarJPG = () => {
    editor.select(lienzoId);
    editor.zoomToSelection();
    // Exporta como png
    exportAsPng.onSelect("menu");
  };

  useEffect(() => {
    editor.createShapes([
      {
        id: lienzoId,
        x: 0,
        y: 0,
        rotation: 90,
        isLocked: false,
        opacity: 1,
        meta: {},
        type: "frame",
        props: {
          w: 1080,
          h: 1080 * 1.5882352,
          name: "Sticker en blanco",
        },
        typeName: "shape",
      },
    ]);

    editor.zoomToFit();
  }, [editor, lienzoId]);

  return (
    <div
      onClick={exportarJPG}
      className="fixed top-2 right-2 sm:top-auto sm:bottom-24 !z-[999] pointer-events-auto"
    >
      <Button color="primary" variant="filled">
        Continuar
      </Button>
    </div>
  );
};
