import {proxy} from 'valtio'
const state = proxy({
    intro: true,
    color: '#1db954',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './logoM-S.png',
    fullDecal: "./Black.png"
})

export default state;