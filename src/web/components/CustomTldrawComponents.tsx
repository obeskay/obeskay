import { TLEditorComponents } from "@tldraw/tldraw";

const CustomTldrawComponents: Partial<TLEditorComponents> = {
  Brush: ({ brush }) => (
    <rect
      className="tl-brush"
      stroke="red"
      fill="none"
      width={Math.max(1, brush.w)}
      height={Math.max(1, brush.h)}
      transform={`translate(${brush.x},${brush.y})`}
    />
  ),
};

export default CustomTldrawComponents;
