import { OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Tree({
  width,
  height,
  leaves,
  dispensedNumbers,
  treeNumber,
  properties,
}) {
  const leavesColor = useTexture("textures/leaf/leaf-diffuse.jpg");
  const leavesAlpha = useTexture("textures/leaf/leaf-displacement.jpg");
  const woodColor = useTexture("textures/wood/wood-color.jpg");
  const woodAO = useTexture("textures/wood/wood-ao.jpg");
  const woodNormal = useTexture("textures/wood/wood-normal.png");
  const treeRef = useRef();

  useFrame((_, delta) => {
    // treeRef.current.rotation.y += Math.sin(delta) * 0.1;
  });

  for (let x of properties) {
    if (x === 0) {
      height += 0.2;
      width += 0.2;
    } else if (x === 1) {
      height -= 0.2;
      width -= 0.2;
    } else if (x === 2) {
      leaves += 0.2;
    } else if (x === 3) {
      leaves -= 0.2;
    } else if (x === 4) {
      height += 0.2;
      width += 0.2;
      leaves += 0.2;
    }
  }

  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <group scale={[0.6, 0.6, 0.6]} ref={treeRef} position={[0, -1, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            transparent={true}
            size={2.0}
            color={"#c19534"}
          />
        </mesh>
        <mesh rotation={[0, 0, 2.4]} position={[0, 3, 0]}>
          <tetrahedronGeometry scale={[0.5, 0.5, 0.5]} args={[5 * leaves, 4]} />
          <meshStandardMaterial
            map={leavesColor}
            transparent={true}
            size={2.0}
            color={"#16770E"}
            // alphaMap={leavesAlpha}
          />
        </mesh>
        <ambientLight intensity={4} position={[-2, 2, 2]} color={"white"} />
        <mesh>
          <boxGeometry
            scale={[0.5, 0.5, 0.5]}
            args={[3 * width, 10 * height, 3 * width]}
          />
          <meshStandardMaterial
            map={woodColor}
            aoMap={woodAO}
            normalMap={woodNormal}
          />
        </mesh>
        <mesh position={[-5, -5, -5]}>
          <dodecahedronGeometry
            scale={[0.5, 0.5, 0.5]}
            args={[2 * leaves, 0]}
          />
          <meshStandardMaterial
            map={leavesColor}
            transparent={true}
            size={2.0}
            // color={"#16770E"}
            // alphaMap={leavesAlpha}
          />
        </mesh>{" "}
        <mesh position={[5, -5, -5]}>
          <dodecahedronGeometry
            scale={[0.5, 0.5, 0.5]}
            args={[2 * leaves, 0]}
          />
          <meshStandardMaterial
            map={leavesColor}
            transparent={true}
            size={2.0}
            // color={"#16770E"}
            // alphaMap={leavesAlpha}
          />
        </mesh>
      </group>
    </>
  );
}
