import { Suspense } from "react";
// anything 3D related should be wrapped in a Suspense component
// to catch any errors that might occur during rendering
// and display a fallback UI

// anything related to 3D appears on a canvas
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; // helper library
import CanvasLoader from '../Loader';

const Earth = () => {
  return (
    <div>Earth</div>
  )
}

const EarthCanvas =() => {
  return (
    <Canvas
    
    >

    </Canvas>
  )
}

export default EarthCanvas;