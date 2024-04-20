/* eslint-disable react/no-unknown-property */
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  // create a ref to the Points component
  const ref = useRef();
  // create sphere of stars
  const sphere = random.inSphere(new Float32Array(1000), { radius: 1.2 });

  // animate the stars to rotate them
  // useFrame is a hook that runs every frame
  useFrame((state, delta) => {
    // rotate the stars
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref} // assign the ref to the Points component
        // positions={sphere} // positions of the stars
        stride={3} // 3 values per point
        frustumCulled // don't draw if the stars are not in the view
        {...props} // pass the props to the Points component
      >
        <PointMaterial
          transparent
          color="#f272c8" // color of the stars
          size={0.002} // size of the stars
          sizeAttenuation={true} // make the stars smaller as they move away
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas;
