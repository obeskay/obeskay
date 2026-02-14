const Backdrop = () => {
  return (
    <group>
      {/* Fondo */}
      <mesh
        receiveShadow
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        position={[0, 0, -5]}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          color="#9d4edd"
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export default Backdrop;
