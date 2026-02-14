// editor.setCurrentTool('select')
import { cn } from "@/lib/utils";
import Pencil from "@phosphor-icons/react/dist/icons/Pencil";
import { track, useEditor } from "@tldraw/tldraw";
import { baseToolClassName, baseToolIconClassName } from "./baseClassNames";

const toolId = "draw";
const DrawTool = track(() => {
  const editor = useEditor();

  const handleClick = () => {
    editor.setCurrentTool(toolId, { date: Date.now() });
  };

  return (
    <div onClick={handleClick} className={cn()}>
      <Pencil className={cn(baseToolIconClassName())} />
    </div>
  );
});

export default DrawTool;
