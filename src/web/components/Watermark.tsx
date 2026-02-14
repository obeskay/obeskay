const Watermark = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-watermark bg-repeat z-[1] bg-[length:96px_96px]  pointer-events-none mix-blend-difference opacity-10" />
  );
};

export default Watermark;
