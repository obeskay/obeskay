import { memo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useGesture } from "react-use-gesture";
import Tarjeta from "./Tarjeta";
import { useMediaQuery } from "react-responsive";
import { useThreeStore } from "@lib/store";

const ThreeCanvas = ({ texturaUrl = null }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const canvasRef = useRef<any>();
  const lightColor = "#ffffff";
  const lightIntensity = 0.5;
  const lightPosition1: [number, number, number] = [-10, 70, 10];
  const lightPosition2: [number, number, number] = [20, -5, -3];
  const initialSpringRotation: [number, number, number] = [-Math.PI / 8, 0, 0];
  const setTextureLoaded: any = useThreeStore("setTextureLoaded");

  const cameraSettings = {
    position: isMobile ? [0, 0, 10] : [0, 0, 8],
    fov: 30,
    zoom: 1,
  };

  const [spring, setSpring] = useSpring<{
    rotation: [number, number, number];
    scale: [number, number, number];
  }>(() => ({
    rotation: initialSpringRotation,
    scale: [1, 1, 1],
    config: { mass: 0.25, tension: 350, friction: 90 },
  }));

  // Esta función permite que la tarjeta se mueva con el mouse y con el dedo en el celular
  const bind = useGesture(
    {
      onDrag: ({ active, movement: [x, y] }) => {
        // Afecta la rotación de la tarjeta
        setSpring({
          rotation: [
            initialSpringRotation[0] + y / (isMobile ? 135 : 180),
            initialSpringRotation[1] + x / (isMobile ? 135 : 180),
            0,
          ],
        });

        !active && setSpring({ rotation: initialSpringRotation });
      },
      onPointerDown: (event: any) => {
        if (event.pointerType === "touch" && event.isPrimary === false) {
          event.preventDefault();
          setSpring({ scale: [1.5, 1.5, 1.5] });
        }
      },
      onPointerUp: (event: any) => {
        if (event.pointerType === "touch" && event.isPrimary === false) {
          event.preventDefault();
          setSpring({ scale: [0.95, 0.95, 0.95] });
        }
      },
    },
    {
      domTarget: canvasRef.current,
      eventOptions: { passive: false },
    }
  );

  // useLockBodyScroll(isMobile); // Disable body scroll when touch is detected

  return (
    <div className="relative w-full h-full overflow-hidden" {...bind()}>
      <Canvas
        resize={{ polyfill: ResizeObserver as any }}
        camera={cameraSettings as any}
        className="absolute w-full h-full inset-0"
      >
        {/* Añade el ambiente de la escena */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={lightPosition1}
          intensity={lightIntensity}
          color={lightColor}
        />
        <directionalLight
          position={lightPosition2}
          intensity={lightIntensity}
          color={lightColor}
        />

        {/* Añade la tarjeta de presentación */}
        <animated.group scale={spring.scale} rotation={spring.rotation as any}>
          <Tarjeta
            texturaUrl={texturaUrl}
            onLoad={() => setTextureLoaded(true)}
          />
        </animated.group>

        {/* Añade la sombra de la tarjeta */}
        <ContactShadows
          position={[0, -1.6, 0.5]}
          width={4}
          height={4}
          far={10}
          rotation={[Math.PI / 2, 0, 0]}
          opacity={0.5}
        />

        {/* Añade el ambiente de la escena */}
      </Canvas>
    </div>
  );
};

export default memo(ThreeCanvas);
