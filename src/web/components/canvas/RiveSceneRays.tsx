import RiveBackground from "@components/animations/RiveBackground";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const RiveSceneRays = () => {
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
    <div className="relative p-4 xl:p-12 h-[100dvh] w-screen flex items-center justify-center bg-gray-300">
      <div className="absolute inset-0 z-[0] mix-blend-soft-card pointer-events-none">
        <div className="relative w-full h-full grayscale">
          <RiveBackground />
        </div>
      </div>
    </div>
  );
};

export default RiveSceneRays;
