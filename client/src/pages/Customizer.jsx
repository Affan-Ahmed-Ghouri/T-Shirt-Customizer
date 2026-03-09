import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab, ImageAdjuster } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const [activeAdjustType, setActiveAdjustType] = useState(null);

  const showTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/v1/dalle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please make sure the server is running.')
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    let newFilterTabState;

    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !state.isLogoTexture;
        setActiveAdjustType(state.isLogoTexture ? 'logo' : null);
        newFilterTabState = state.isLogoTexture;
        break;
      case "stylishShirt":
        state.isFullTexture = !state.isFullTexture;
        setActiveAdjustType(state.isFullTexture ? 'full' : null);
        newFilterTabState = state.isFullTexture;
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        setActiveAdjustType('logo');
        newFilterTabState = true;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: newFilterTabState
      }
    })
  }

  const handleUpdateLogo = (updates) => {
    Object.assign(state, updates);
  };

  const handleUpdateFull = (updates) => {
    Object.assign(state, updates);
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
        if (type === 'logo') {
          setActiveAdjustType('logo');
        } else {
          setActiveAdjustType('full');
        }
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {showTabContent()}
              </div>

              {activeAdjustType && (
                <div className="image-adjuster-container ml-6 p-4 bg-gray-100 rounded-lg">
                  <ImageAdjuster
                    logoPosition={snap.logoPosition}
                    logoRotation={snap.logoRotation}
                    logoScale={snap.logoScale}
                    fullPosition={snap.fullPosition}
                    fullRotation={snap.fullRotation}
                    fullScale={snap.fullScale}
                    activeType={activeAdjustType}
                    onUpdateLogo={handleUpdateLogo}
                    onUpdateFull={handleUpdateFull}
                  />
                  <CustomButton
                    type="filled"
                    title="Close Adjuster"
                    handleClick={() => setActiveAdjustType(null)}
                    customStyles="text-xs w-full mt-4"
                  />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5 flex gap-3"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Download"
              handleClick={downloadCanvasToImage}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
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