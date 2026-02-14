/* eslint-disable @next/next/no-img-element */
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Html, Center } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";
import { useThreeStore } from "@lib/store";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { motion } from "framer-motion-3d";
import { transform, easeInOut } from "framer-motion";

const blenderScene = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1685061355/baseStickyCovers_rgwozb.glb`;
const defaultTextureUrl = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1685061078/Plane-min_hp02r0.jpg`;

const Tarjeta = ({ texturaUrl = null, ...props }) => {
  const [
    textureUrl,
    setTextureUrl,
    isLoadingTexture,
    setIsLoadingTexture,
  ]: any = useThreeStore(
    "textureUrl, setTextureUrl, isLoadingTexture, setIsLoadingTexture"
  );

  const [isLoading, setIsLoading] = useState(true);

  const texture: any = useTexture(
    texturaUrl || textureUrl || defaultTextureUrl
  );

  const { nodes }: any = useGLTF(blenderScene, true);

  const ref: any = useRef();
  const groupRef: any = useRef();

  // Cuando se carga la textura, se desactiva el loader
  useEffect(() => {
    if (isLoadingTexture) {
      setIsLoading(false);
    }
  }, [isLoadingTexture]);

  // Make it float in the air when it's opened
  // useFrame((state) => {
  //   if (!groupRef.current) return;
  //   const t = state.clock.getElapsedTime();
  //   groupRef.current.rotation.x = Math.sin(t / 2) / 8;
  //   groupRef.current.rotation.y = Math.sin(t / 2) / 2;
  // });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = transform(
      t,
      [0, Math.PI * 2, Math.PI * 4, Math.PI * 6, Math.PI * 8],
      [0, Math.PI, Math.PI * 2, Math.PI * 2, Math.PI * 3],
      {
        ease: easeInOut,
      }
    );

    groupRef.current.rotation.x = Math.sin(t / 2) / 8;
    // groupRef.current.rotation.y = Math.sin(t / 2) / 2;
  });

  return (
    <motion.group ref={groupRef} {...props}>
      <motion.mesh
        ref={ref}
        rotation={[0, Math.PI * 2, 0]}
        scale={[0.85, 0.85, 0.85]}
        position={[0, 0.125, 0]}
        geometry={nodes["Cube_Cube002"]?.geometry}
      >
        <meshStandardMaterial
          attach="material"
          map={texture}
          roughness={0.75}
          metalness={0}
          envMapIntensity={0.25}
        />
      </motion.mesh>

      {!isLoading && <LoaderMesh />}
    </motion.group>
  );
};

export const LoaderMesh = () => {
  return (
    <Center>
      <Html distanceFactor={5}>
        <div className="flex justify-center items-center text-card text-4xl p-2 bg-black/60 rounded-2xl -translate-x-1/2 -translate-y-1/2 aspect-square ">
          <LoadingAnimation />
        </div>
      </Html>
    </Center>
  );
};

export default memo(Tarjeta);
