import { useGlobalStore } from "@/lib/store";
import { AIDialog } from "./AiDialog";
import CustomUI from "./tldraw-custom-ui/customUi";
import { createShapeId, useEditor } from "@tldraw/tldraw";
import { useEffect } from "react";

export const InsideEditorContext = () => {
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
          w: 1080,
          h: 1080 * 1.5882352,
          name: "Sticker en blanco",
        },
        typeName: "shape",
      },
    ]);

    setLienzoId(lienzoId);

    editor.select(lienzoId);

    editor.zoomToFit();
  }, [editor]);

  return (
    <CustomUI>
      <div className="pointer-events-auto">
        <AIDialog />
      </div>
    </CustomUI>
  );
};
