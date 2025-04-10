import {Canvas} from "@react-three/fiber"
import {Environment, Center} from "@react-three/drei" 
import Shirt from "./Shirt"
import CameraRig from "./CameraRig"
import Backdrop from "./BackDrop"

const CanvasModel = () => {
  return (
    <Canvas 
    shadows
    camera={{position: [0,0,0], fov: 30 }}
    gl={{preserveDrawingBuffer: true}}
    className="w-full max-w-full h-full transition-all easi-in"
    >
      <ambientLight intensity={0.65}/>
      <Environment preset="city"/>
      <CameraRig>
        <Backdrop/>
        <Center>
        <Shirt/>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel