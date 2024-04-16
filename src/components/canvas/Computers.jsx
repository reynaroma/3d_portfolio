/* eslint-disable react/no-unknown-property */

/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState, React } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = () => {

  // Load the computer model from the gltf file using useGLTF hook from drei package
  const computer = useGLTF('./desktop_pc/scene.gltf');
  // when creating threejs elements, we're not gonna use div
  // instead we're gonna use Canvas component from drei package
  // which is a wrapper around threejs renderer and scene
  // and it's gonna render the scene in the canvas element

  // mesh is a threejs element that represents a 3d object
  // pointLight is a light source that emits light in all directions
  // primitive is a threejs element that represents a 3d object
  // hemisphereLight is a light source that emits light in all directions
  // primitive represents the 3d object that we loaded from the gltf file

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}
// Canvas component is a wrapper around threejs renderer and scene
// and it's gonna render the scene in the canvas element
const ComputersCanvas = () => {
  // OrbitControls is a component
  // that allows us to move the camera around the scene left and right
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default Computers