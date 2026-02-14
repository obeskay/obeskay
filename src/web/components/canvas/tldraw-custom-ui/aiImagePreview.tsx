import { AiImageTool } from "./AiImageTool/AiImageTool";
import {
  TLEditorComponents,
  TLUiAssetUrlOverrides,
  Tldraw,
  createShapeId,
  toolbarItem,
  useActions,
  useEditor,
} from "@tldraw/tldraw";
import { memo, useCallback, useEffect, useState } from "react";
import { useGlobalStore } from "@/lib/store";
import "@tldraw/tldraw/tldraw.css";
import "driver.js/dist/driver.css";
import * as Driver from "driver.js";
import { motion } from "framer-motion";
import CustomUI from "@components/canvas/tldraw-custom-ui/customUi";

const customAssetUrls: TLUiAssetUrlOverrides = {
  icons: {
    "tool-ia": "/images/MagicWand.svg",
  },
};

const customTools = [AiImageTool];

const Editor = () => {
  const [state, setState] = useState({
    generatedImageUrl: "",
    setGeneratedImageUrl: (imageUrl: string) =>
      setState((s) => ({ ...s, generatedImageUrl: imageUrl })),

    canvasId: createShapeId(),
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      const driverObj = Driver.driver({
        showProgress: false,
        stageRadius: 24,
        showButtons: ["close", "next"],
        doneBtnText: "¡Pruébalo!",
        nextBtnText: "Siguiente",
        animate: true,
        overlayColor: "#272838",
        steps: [
          {
            element: ".tlui-toolbar__tools button:nth-child(6)",
            popover: {
              title: "¡Utiliza tus propias imágenes! 🖼️",
              description:
                "Utiliza esta y otras herramientas para crear tu sticker a tu antojo 🎨.",
            },
          },
        ],
      });
      driverObj.drive();
    }
  }, [mounted]);

  return (
    <div className="fixed inset-0 bg-secondary/10">
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-repeat"
        animate={{
          opacity: [1, 0.125, 1],
        }}
        transition={{
          loop: Infinity,
          duration: 3,
          repeat: Infinity,
        }}
        style={{
          backgroundImage: "url('/images/grid-white-creator.svg')",
          backgroundSize: "64px 64px",
        }}
      />
      <Tldraw
        tools={customTools}
        onMount={() => setMounted(true)}
        className="stickycovers-theme"
        assetUrls={customAssetUrls}
        components={customComponents}
      >
        <InsideEditorContext />
      </Tldraw>
    </div>
  );
};

const InsideEditorContext = () => {
  const [setLienzoId] = useGlobalStore((s) => [s.setLienzoId]);
  const editor = useEditor();

  const lienzoId = createShapeId();

  useEffect(() => {
    editor.createShapes([
      {
        id: lienzoId,
        x: 0,
        y: 0,
        rotation: 0,
        isLocked: false,
        opacity: 1,
        meta: {},
        type: "frame",
        props: {
          w: 1080 * 1.5882352,
          h: 1080,
          name: "Sticker en blanco",
        },
        typeName: "shape",
      },
    ]);

    setLienzoId(lienzoId);

    editor.select(lienzoId);

    editor.zoomToFit();
  }, [editor]);

  return <CustomUI />;
};

export default memo(Editor);
const customComponents: TLEditorComponents = {};
