import {motion, AnimatePresence} from "framer-motion"
import {useSnapshot} from "valtio"
import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
  slideAnimation
 } from "../config/motion"
import state from '../store'
import { CustomButton } from "../components"
const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <>
          <motion.section className="home" {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <img 
                src='./logoM-S.png'
                alt="logo"
                className="w-16 h-16 object-cover"
              />
            </motion.header>
            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className="head-text">Customize<br className="block" />Your Shirt</h1>
              </motion.div>
              <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                <p className="max-w-md font-normal text-white text-base">Create your unique and exclusive shirt with our brand new 3D customization tool.<strong> Unleash your imagination</strong>{" "} and define your own style.</p>
                <CustomButton 
              type="filled"
              title= "Customize It"
              handleClick={() => state.intro = false}
              customstyles = "w-fit px-4 py-2.5 font-bold text-sm"
            />
            </motion.div>
          </motion.div>
          
        </motion.section>
        <motion.div className="w-[100%] absolute bottom-4 text-center">
            <p className="font-normal text-gray-400 text-base">
              copyright | @mohedabbas.fr | 2023
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Home