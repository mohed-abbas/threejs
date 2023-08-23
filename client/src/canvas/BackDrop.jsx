import React, {useRef} from "react"
import {easing} from "maath"
import { useFrame } from "@react-three/fiber"
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei"

const BackDrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows 
      ref={shadows}
      position={[0,0, -0.14]}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2 , 0, 0]}
    >

    {/* First light with intesity and casting shadows */}
      <RandomizedLight 
      amount={4}
      radius={9}
      intensity={1}
      ambient={0.75}
      position={[5, 5, -10]}
      />
    {/* Second light to have better shadows. */}
    <RandomizedLight 
      amount={4}
      radius={7}
      intensity={0.75}
      ambient={0.5}
      position={[-5, 5, 7]}
      />
      <RandomizedLight 
      amount={5}
      radius={10}
      intensity={1}
      ambient={0.5}
      position={[-0, 0, 0]}
      />
    </AccumulativeShadows>
  )
}

export default BackDrop