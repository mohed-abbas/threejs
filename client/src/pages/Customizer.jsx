import React , {useState, useEffect} from "react"
import {useSnapshot} from "valtio"
import {AnimatePresence , motion} from "framer-motion"
import config from "../config/config"
import state from "../store"
import {download} from "../assets"
import { downloadCanvasToImage, reader } from "../config/helpers"
import {EditorTabs, FilterTabs, DecalTypes} from "../config/constants"

import {fadeAnimation, slideAnimation} from "../config/motion"
import {CustomButton, AIpicker, FilePicker, ColorPicker, Tab} from "../components"

const Customizer = () => {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        {/* Left side panel with all picker buttons to pick images/logos */}
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                  key={tab.name}
                  tab={tab}
                  handleClick={() => {}}
                  />
                  ))}
              </div>
            </div>
          </motion.div>
        {/* Go back button on the main customizer screen/page */}
          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" 
              handleClick={()=> state.intro = true}
              customstyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        {/* Bottom panel to Toggle the shirt customizations */}
        <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab 
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab=""
              handleClick={() => {}}  
              />
            ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer