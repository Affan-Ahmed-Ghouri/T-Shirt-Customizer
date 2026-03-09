import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  logoPosition: [0, 0.04, 0.15],
  logoRotation: [0, 0, 0],
  logoScale: 0.15,
  fullPosition: [0, 0, 0],
  fullRotation: [0, 0, 0],
  fullScale: 1,
});

export default state;