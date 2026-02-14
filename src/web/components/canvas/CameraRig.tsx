import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

const CameraRig = ({ children }) => {
  const group: any = useRef();

  useFrame((state, delta) => {
    if (state && state.camera && state.camera.position) {
      // Después de 1 segundo, la cámara se mueve a la posición [0, 0, 40]
      easing.damp3(state.camera.position, [0, 0, 40], 0.75, delta);
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
