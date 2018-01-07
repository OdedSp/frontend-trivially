import Vue from 'vue'

export const RIGHT_ANSWER = 'rightAnswer'
export const RIVAL_DISCONNECTED = 'rivalLeft'
export const NEW_GAME = 'newGame'
export const GAME_WON = 'gameWon'

const bus = new Vue()

export default bus
