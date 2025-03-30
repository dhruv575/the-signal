import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #f9f9f9;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem 2rem;
  }
`;

const CamerasGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Camera = styled.div`
  background: ${props => props.baseColor || '#222'};
  padding: 2rem 1.5rem 2.5rem;
  border-radius: 18px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.2),
    inset 0 1px 3px rgba(255, 255, 255, 0.3),
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  transition: transform 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 2rem;
    max-width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
  }

  /* Camera brand logo */
  &::before {
    content: '${props => props.brand || "DIGICAM"}';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-family: 'Arial', sans-serif;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
  }

  /* Flash */
  &::after {
    content: '';
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #f0f0f0, #ccc);
    border-radius: 50%;
    box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
    border: 1px solid ${props => props.accentColor || '#111'};
  }
`;

const CameraBody = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 1rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CameraLens = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(145deg, #222, #111);
  border: 2px solid ${props => props.accentColor || '#444'};
  top: -40px;
  left: 30px;
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.5),
    inset 0 0 10px rgba(0, 0, 0, 0.8);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #000;
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(#333, #000);
  }
`;

const Screen = styled.div`
  background: #000;
  border: ${props => props.screenBorder || '3px solid #444'};
  border-radius: 8px;
  padding: 3px;
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.3),
    inset 0 0 3px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0) 50%);
    pointer-events: none;
    z-index: 1;
    border-radius: 4px;
  }
`;

const ControlPanel = styled.div`
  background: ${props => props.controlsColor || '#333'};
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

const MenuDisplay = styled.div`
  background: ${props => props.backgroundColor || '#0a3b4a'};
  border-radius: 5px;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: ${props => props.textColor || '#3fd2ff'};
  height: 4.5rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    height: 4rem;
  }
`;

const MenuTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.3rem;
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.65rem;
  width: 100%;
  overflow: hidden;
`;

const MenuOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50%;
  }
  
  span.active {
    color: #fff;
    font-weight: bold;
    text-align: right;
  }
`;

const NavigationControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.4rem;
  background: ${props => props.navBgColor || '#252525'};
  padding: 0.6rem;
  border-radius: 8px;
  box-shadow: 
    inset 0 1px 3px rgba(0, 0, 0, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.1);
`;

const NavButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: ${props => props.bgColor || 'linear-gradient(145deg, #333, #222)'};
  color: ${props => props.textColor || '#ddd'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  border-radius: 4px;
  transition: all 0.1s ease;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  height: 32px;

  &:hover {
    background: ${props => props.hoverBgColor || 'linear-gradient(145deg, #383838, #252525)'};
    transform: translateY(-1px);
  }

  &:active {
    background: ${props => props.activeBgColor || 'linear-gradient(145deg, #222, #333)'};
    transform: translateY(1px);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  
  span {
    font-size: 0.6rem;
    position: absolute;
    bottom: 2px;
    opacity: 0.8;
  }
`;

const LeftNavButton = styled(NavButton)`
  grid-column: 1;
  grid-row: 2;
`;

const CenterNavButton = styled(NavButton)`
  grid-column: 2;
  grid-row: 2;
  background: ${props => props.accentColor || '#446'};
  color: white;
  
  &:hover {
    background: ${props => props.accentColorHover || '#557'};
  }
  
  &:active {
    background: ${props => props.accentColorActive || '#335'};
  }
`;

const RightNavButton = styled(NavButton)`
  grid-column: 3;
  grid-row: 2;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
`;

const ActionButton = styled.button`
  border: none;
  background: ${props => props.bgColor || 'linear-gradient(145deg, #444, #333)'};
  color: ${props => props.textColor || '#fff'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 0.8rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  padding: 0.6rem 0;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);

  &:hover {
    background: ${props => props.hoverBgColor || 'linear-gradient(145deg, #494949, #383838)'};
    transform: translateY(-2px);
  }

  &:active {
    background: ${props => props.activeBgColor || 'linear-gradient(145deg, #333, #444)'};
    transform: translateY(1px);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  
  span {
    font-size: 0.6rem;
    opacity: 0.8;
  }
`;

const StatusBar = styled.div`
  background: ${props => props.statusBgColor || '#111'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const CameraModel = styled.div`
  font-size: 0.6rem;
  color: ${props => props.textColor || '#888'};
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BatteryIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: ${props => props.textColor || '#888'};
  
  svg {
    margin-right: 0.3rem;
  }
`;

const Counter = styled.div`
  background: ${props => props.bgColor || '#1a1a1a'};
  color: ${props => props.textColor || '#ff5f5f'};
  padding: 0.3rem 0.5rem;
  font-family: 'Digital', 'Courier New', monospace;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
  min-width: 2.5rem;
`;

const ShutterButton = styled.button`
  position: absolute;
  top: -20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ff3535, #cc2929);
  border: none;
  cursor: pointer;
  box-shadow: 
    0 3px 5px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transition: all 0.1s ease;
  
  &:hover {
    background: linear-gradient(145deg, #ff4545, #dd3030);
    transform: translateY(-1px);
  }
  
  &:active {
    background: linear-gradient(145deg, #cc2929, #bb2525);
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(145deg, #cc2929, #ff3535);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const PowerButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(145deg, #444, #333);
  border: 1px solid #222;
  cursor: pointer;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${props => props.isOn ? '#2ecc71' : '#e74c3c'};
    box-shadow: 0 0 3px ${props => props.isOn ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)'};
  }
`;

const ZoomSlider = styled.input.attrs({ type: 'range' })`
  position: absolute;
  top: -12px;
  left: 85px;
  width: 100px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #222;
  border-radius: 2px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 15px;
    border-radius: 3px;
    background: linear-gradient(145deg, #ddd, #aaa);
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 10px;
    height: 15px;
    border-radius: 3px;
    background: linear-gradient(145deg, #ddd, #aaa);
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    border: none;
  }
`;

const ZoomLabels = styled.div`
  position: absolute;
  top: -25px;
  left: 85px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.7);
`;

const SoundFx = styled.audio`
  display: none;
`;

const ProjectDescription = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
    font-family: 'Montserrat', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #555;
    margin-bottom: 1.2rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

// Example menu states
const menuStates = {
  main: {
    title: 'MAIN MENU',
    options: [
      { label: 'Mode', value: 'Auto' },
      { label: 'Effects', value: 'Normal' },
      { label: 'Settings', value: '>' }
    ]
  },
  settings: {
    title: 'SETTINGS',
    options: [
      { label: 'Display', value: 'Bright' },
      { label: 'Sound', value: 'On' },
      { label: 'Back', value: '<' }
    ]
  },
  effects: {
    title: 'EFFECTS',
    options: [
      { label: 'Filter', value: 'None' },
      { label: 'B&W', value: 'Off' },
      { label: 'Back', value: '<' }
    ]
  }
};

const images = {
  camera1: Array.from({ length: 26 }, (_, i) => `/images/camera_1/470700${String(i + 1).padStart(2, '0')}.JPG`),
  camera2: Array.from({ length: 26 }, (_, i) => `/images/camera_2/470500${String(i + 1).padStart(2, '0')}.JPG`),
  camera3: Array.from({ length: 26 }, (_, i) => `/images/camera_3/470600${String(i + 1).padStart(2, '0')}.JPG`)
};

const cameraModels = {
  camera1: 'DIGICAM X100',
  camera2: 'PIXELVIEW 5000',
  camera3: 'PHOTOMASTER PRO'
};

const PennThroughMyEyes = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({
    camera1: 0,
    camera2: 0,
    camera3: 0
  });
  
  const [currentMenu, setCurrentMenu] = useState({
    camera1: 'main',
    camera2: 'main',
    camera3: 'main'
  });
  
  const [isOn, setIsOn] = useState({
    camera1: true,
    camera2: true,
    camera3: true
  });
  
  const [zoomLevel, setZoomLevel] = useState({
    camera1: 1,
    camera2: 1,
    camera3: 1
  });
  
  const [imageFilter, setImageFilter] = useState({
    camera1: 'none',
    camera2: 'none',
    camera3: 'none'
  });

  const nextImage = (camera) => {
    if (!isOn[camera]) return;
    setCurrentImageIndex(prev => ({
      ...prev,
      [camera]: (prev[camera] + 1) % images[camera].length
    }));
  };

  const prevImage = (camera) => {
    if (!isOn[camera]) return;
    setCurrentImageIndex(prev => ({
      ...prev,
      [camera]: (prev[camera] - 1 + images[camera].length) % images[camera].length
    }));
  };

  const randomImage = (camera) => {
    if (!isOn[camera]) return;
    setCurrentImageIndex(prev => ({
      ...prev,
      [camera]: Math.floor(Math.random() * images[camera].length)
    }));
  };

  const downloadImage = (camera) => {
    if (!isOn[camera]) return;
    const link = document.createElement('a');
    link.href = images[camera][currentImageIndex[camera]];
    link.download = `humans-of-penn-${camera}-${currentImageIndex[camera] + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = (camera) => {
    if (!isOn[camera]) return;
    if (navigator.share) {
      navigator.share({
        title: 'Humans of Penn',
        text: `Check out this photo from Humans of Penn!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const togglePower = (camera) => {
    setIsOn(prev => ({
      ...prev,
      [camera]: !prev[camera]
    }));
  };
  
  const handleZoomChange = (camera, value) => {
    if (!isOn[camera]) return;
    setZoomLevel(prev => ({
      ...prev,
      [camera]: value
    }));
  };
  
  const toggleMenu = (camera) => {
    if (!isOn[camera]) return;
    setCurrentMenu(prev => {
      const current = prev[camera];
      if (current === 'main') return { ...prev, [camera]: 'settings' };
      if (current === 'settings') return { ...prev, [camera]: 'effects' };
      return { ...prev, [camera]: 'main' };
    });
  };
  
  const playSound = (type) => {
    const audio = document.getElementById(type);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Silently handle audio playback errors
        console.debug('Audio playback failed:', error);
      });
    }
  };

  const cameraStyles = {
    camera1: {
      baseColor: '#2d3436',
      accentColor: '#74b9ff',
      controlsColor: '#1e272e',
      screenBorder: '3px solid #0984e3',
      menuBg: '#0a3b4a',
      menuText: '#3fd2ff',
      counterBg: '#1e272e',
      counterText: '#74b9ff',
      brand: 'DIGICAM'
    },
    camera2: {
      baseColor: '#4a3830',
      accentColor: '#ff9f43',
      controlsColor: '#382a23',
      screenBorder: '3px solid #d68529',
      menuBg: '#402e18',
      menuText: '#ffc988',
      counterBg: '#382a23',
      counterText: '#ffc988',
      brand: 'PIXELVIEW'
    },
    camera3: {
      baseColor: '#2c3e50',
      accentColor: '#55efc4',
      controlsColor: '#1e3342',
      screenBorder: '3px solid #00b894',
      menuBg: '#10372a',
      menuText: '#7dffe1',
      counterBg: '#1e3342',
      counterText: '#7dffe1',
      brand: 'PHOTOMASTER'
    }
  };

  const getImageStyle = (camera) => {
    let style = {};
    
    // Apply zoom
    style.transform = `scale(${zoomLevel[camera]})`;
    
    // Apply filters
    switch(imageFilter[camera]) {
      case 'bw':
        style.filter = 'grayscale(100%)';
        break;
      case 'sepia':
        style.filter = 'sepia(80%)';
        break;
      case 'vintage':
        style.filter = 'sepia(30%) contrast(110%) brightness(90%)';
        break;
      default:
        style.filter = 'none';
    }
    
    return style;
  };

  const renderCamera = (num) => {
    const cameraKey = `camera${num}`;
    const styles = cameraStyles[cameraKey];
    const currentMenuData = menuStates[currentMenu[cameraKey]];
    
    return (
      <Camera 
        key={num}
        baseColor={styles.baseColor}
        accentColor={styles.accentColor}
        brand={styles.brand}
      >
        <CameraLens accentColor={styles.accentColor} />
        <ZoomLabels>
          <span>1x</span>
          <span>2x</span>
        </ZoomLabels>
        <ZoomSlider 
          min="1" 
          max="1.5" 
          step="0.05" 
          value={zoomLevel[cameraKey]}
          onChange={(e) => handleZoomChange(cameraKey, e.target.value)}
          disabled={!isOn[cameraKey]}
        />
        <ShutterButton 
          onClick={() => nextImage(cameraKey)}
          title="Shutter / Next photo"
          disabled={!isOn[cameraKey]}
        />
        <CameraBody>
          <Screen 
            screenBorder={styles.screenBorder}
            style={{ opacity: isOn[cameraKey] ? 1 : 0.3 }}
          >
            <img 
              src={images[cameraKey][currentImageIndex[cameraKey]]} 
              alt={`Camera ${num} - Photo ${currentImageIndex[cameraKey] + 1}`}
              style={getImageStyle(cameraKey)}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg'; // Add a placeholder image
              }}
            />
          </Screen>
          
          <ControlPanel controlsColor={styles.controlsColor}>
            <MenuDisplay 
              backgroundColor={styles.menuBg}
              textColor={styles.menuText}
              style={{ opacity: isOn[cameraKey] ? 1 : 0.3 }}
            >
              <MenuTitle>{currentMenuData.title}</MenuTitle>
              <MenuOptions>
                {currentMenuData.options.map((option, idx) => (
                  <MenuOption key={idx}>
                    <span>{option.label}</span>
                    <span className="active">{option.value}</span>
                  </MenuOption>
                ))}
              </MenuOptions>
            </MenuDisplay>
            
            <NavigationControls navBgColor={`${styles.controlsColor}99`}>
              <LeftNavButton 
                onClick={() => prevImage(cameraKey)}
                disabled={!isOn[cameraKey]}
              >
                ←
                <span>PREV</span>
              </LeftNavButton>
              
              <CenterNavButton 
                accentColor={styles.accentColor}
                accentColorHover={`${styles.accentColor}dd`}
                accentColorActive={`${styles.accentColor}99`}
                onClick={() => randomImage(cameraKey)}
                disabled={!isOn[cameraKey]}
              >
                ⟳
                <span>RAND</span>
              </CenterNavButton>
              
              <RightNavButton 
                onClick={() => nextImage(cameraKey)}
                disabled={!isOn[cameraKey]}
              >
                →
                <span>NEXT</span>
              </RightNavButton>
            </NavigationControls>
            
            <ActionButtons>
              <ActionButton 
                onClick={() => downloadImage(cameraKey)}
                disabled={!isOn[cameraKey]}
                bgColor={`${styles.accentColor}33`}
                hoverBgColor={`${styles.accentColor}55`}
                title="Download photo"
              >
                ↓
                <span>SAVE</span>
              </ActionButton>
              
              <ActionButton 
                onClick={() => shareImage(cameraKey)}
                disabled={!isOn[cameraKey]}
                bgColor={`${styles.accentColor}33`}
                hoverBgColor={`${styles.accentColor}55`}
                title="Share photo"
              >
                ⎘
                <span>SHARE</span>
              </ActionButton>
            </ActionButtons>
          </ControlPanel>
        </CameraBody>
        
        <StatusBar statusBgColor={`${styles.controlsColor}dd`}>
          <CameraModel textColor={styles.menuText}>
            {cameraModels[cameraKey]}
          </CameraModel>
          
          <Counter 
            bgColor={styles.counterBg}
            textColor={styles.counterText}
          >
            {currentImageIndex[cameraKey] + 1}
          </Counter>
          
          <BatteryIndicator textColor={styles.menuText}>
            <svg width="14" height="8" viewBox="0 0 14 8">
              <rect x="0" y="1" width="12" height="6" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="1" />
              <rect x="1" y="2" width="8" height="4" rx="0" ry="0" fill="currentColor" />
              <rect x="12" y="2.5" width="2" height="3" rx="0.5" ry="0.5" fill="currentColor" />
            </svg>
            75%
          </BatteryIndicator>
        </StatusBar>
        
        <PowerButton 
          onClick={() => togglePower(cameraKey)}
          isOn={isOn[cameraKey]}
          title="Power on/off"
        />
      </Camera>
    );
  };

  return (
    <Container>
      <CamerasGrid>
        <TopRow>
          {renderCamera(1)}
          {renderCamera(2)}
        </TopRow>
        <BottomRow>
          {renderCamera(3)}
        </BottomRow>
      </CamerasGrid>

      <ProjectDescription>
        <h2>About the Project</h2>
        <p>
          Penn Through My Eyes is a unique photography project that captures the daily lives and stories of Penn students through disposable cameras. 
          Each camera was passed between different students, with each person taking one photo per day before passing it on to someone new.
        </p>
        <p>
          Through these three cameras, we've collected a series of authentic, unfiltered moments that showcase the diversity and spontaneity 
          of life at Penn. Each image tells its own story, captured through the lens of different perspectives and experiences.
        </p>
        <p>
          Interact with our digital camera interface above to browse through the collection and discover the story of Penn through the eyes of its community.
        </p>
      </ProjectDescription>
      
      {/* Sound effects */}
      <SoundFx id="click" src="/sounds/click.mp3" preload="auto" />
      <SoundFx id="shutter" src="/sounds/shutter.mp3" preload="auto" />
      <SoundFx id="beep" src="/sounds/beep.mp3" preload="auto" />
      <SoundFx id="whir" src="/sounds/whir.mp3" preload="auto" />
      <SoundFx id="power" src="/sounds/power.mp3" preload="auto" />
    </Container>
  );
};

export default PennThroughMyEyes;