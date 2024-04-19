/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
// anything 3D related should be wrapped in a Suspense component
// to catch any errors that might occur during rendering
// and display a fallback UI and render the CanvaLoader component

// anything related to 3D appears on a canvas
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; // helper library
import CanvasLoader from '../Loader';

const Earth = () => {
  // useGLTF is a hook that loads a glTF model
  // import the model and pass the path to
  const earth = useGLTF('./planet/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near:0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Earth />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas;