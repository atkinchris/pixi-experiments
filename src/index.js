import Phaser from 'phaser'

import { spritesheet, spritesheetImage } from './assets'

import gameState from './states/game'

let game

function preload() {
  game.load.atlas('sprites', spritesheetImage, spritesheet)
}

function create() {
  game.advancedTiming = true

  game.state.add('Game', gameState)
  game.state.start('Game')
}

const config = {
  width: 640,
  height: 640,
  renderer: Phaser.AUTO,
  antialias: false,
  transparent: true,
  state: {
    preload,
    create,
  },
}

game = new Phaser.Game(config)
