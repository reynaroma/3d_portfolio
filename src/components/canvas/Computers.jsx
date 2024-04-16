/* eslint-disable react/no-unknown-property */

/* eslint-disable no-unused-vars */
import { Suspense, useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ ismObile }) => {

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
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
      />
      <primitive
        object={computer.scene}
        scale={ismObile ? 0.7 : 0.75}
        position={ismObile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
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

  // we use the useState hook to create a state variable
  // to check if the user is on a mobile device
  const [ismObile, setIsMobile] = useState(false);

  // we use the useEffect hook to check if the user is on a mobile device
  useEffect(() => {

    // Add a media query to check if the user is on a mobile device
    // Add an event listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the isMobile state to true if the user is on a mobile device
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Add the event listener to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the event listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

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
        <Computers ismObile={ismObile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;