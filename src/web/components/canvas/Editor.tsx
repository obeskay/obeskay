import {
  TLEditorComponents,
  TLUiAssetUrlOverrides,
  Tldraw,
  toolbarItem,
} from "@tldraw/tldraw";

import { useCallback, memo, useEffect, useState } from "react";
import { useGlobalStore } from "@/lib/store";
import "@tldraw/tldraw/tldraw.css";
import "driver.js/dist/driver.css";
import * as Driver from "driver.js";
import { motion } from "framer-motion";
import { InsideEditorContext } from "./InsideEditorContext";

const customAssetUrls: TLUiAssetUrlOverrides = {
  icons: {
    "tool-ia": "/images/Sparkle.svg",
  },
};

const customTools = [];

const Editor = () => {
  const [mounted, setMounted] = useState(false);
  const [openPromptDialog, setOpenPromptDialog] = useGlobalStore((s) => [
    s.openPromptDialog,
    s.setOpenPromptDialog,
  ]);

  const handleCreateAIImage = useCallback((editor) => {
    setOpenPromptDialog(true);
  }, []);

  useEffect(() => {
    if (mounted && !openPromptDialog) {
      const driverObj = Driver.driver({
        showProgress: false,
        stageRadius: 24,
        showButtons: ["close", "next"],
        doneBtnText: "Cerrar",
        nextBtnText: "Siguiente",
        animate: true,
        overlayColor: "#272838",
        steps: [
          // Informa de la tool de IA
          {
            element: ".tlui-toolbar__tools button:nth-child(5)",
            popover: {
              title: "¡Genera stickers con IA! 🧠",
              description:
                "Utiliza esta herramienta para generar imágenes de manera automática 🤖.",
            },
          },
          // {
          //   element: ".tlui-toolbar__tools button:nth-child(7)",
          //   popover: {
          //     title: "¡Utiliza tus propias imágenes! 🖼️",
          //     description:
          //       "Utiliza esta y otras herramientas para crear tu sticker a tu antojo 🎨.",
          //   },
          // },
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
        overrides={{
          tools: (editor, tools, store) => {
            return {
              ...tools,
              ia: {
                id: "generatedImage",
                label: "IA",
                readonlyOk: false,
                icon: "tool-ia",
                kbd: "j",
                onSelect: () => handleCreateAIImage(editor),
              },
            };
          },
          toolbar(editor, toolbar, { tools }) {
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
              "note",
              "arrow",
              "cloud",
            ];
            toolbar = toolbar.filter((item) => {
              return !blacklistIds.includes(item.id);
            });

            toolbar.splice(4, 0, toolbarItem(tools.ia));

            return toolbar;
          },
        }}
        assetUrls={customAssetUrls}
        components={customComponents}
      >
        <InsideEditorContext />
      </Tldraw>
    </div>
  );
};

export default memo(Editor);
const customComponents: TLEditorComponents = {};
