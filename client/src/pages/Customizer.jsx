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
  const [file, setFile] = useState('');
  const [prompt, setprompt] = useState('');
  const [generatingImg, setgeneratingImg] = useState(false);
  const [activeEditorTab, setactiveEditorTab] = useState('')
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  });
  // Show tqb content depending on selected tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readfile={readfile}
        />
      case 'aipicker':
        return <AIpicker
          prompt={prompt}
          setprompt={setprompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      // call to our backend tocall the openAi api to get the image.
      setgeneratingImg(true);
      const response = await fetch('https://unlisted-shirt-design.onrender.com/api/v1/dalle', 
      {
        method: 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json()
      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    }  finally {
      setgeneratingImg(false)
      setactiveEditorTab()
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]
    state[decalType.stateProperty] = result;
    if(!activeFilterTab[decalType.filterTab]){ 
      handleActiveFilterTab(decalType.filterTab)
     }
    }
    const handleActiveFilterTab = (tabName) => {
      switch (tabName) {
        case 'logoShirt':
          state.isLogoTexture = !activeFilterTab[tabName]
          break;
        case 'stylishShirt':
          state.isFullTexture = !activeFilterTab[tabName]
          break;
        default:
          state.isLogoTexture = true;
          state.isFullTexture= false;
          break;
      }

      // after setting the state , activefiltertab 
      setactiveFilterTab((prevState) => {
        return {
          ...prevState,
          [tabName]: !prevState[tabName]
        }
      })
    }
  const readfile = (type) => {
    reader(file)
    .then((result) => {
      handleDecals(type, result);
      setactiveEditorTab('')
    })
  }

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
                  handleClick={() => setactiveEditorTab(tab.name)}
                  />
                  ))}
                  {generateTabContent()}
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
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}  
              />
            ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer