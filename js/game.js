/* global Phaser */

//* Copyright (c) 2023 Dominic M. Mohamad T. All rights reserved
//
// Created by: Dominic M. Mohamad T.
// Created on: June 2023
// This is the Phaser3 game configuration file

// scene import statements
import SplashScene from './scenes/splashScene.js'
import TitleScene from './scenes/titleScene.js'

// create the scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    },
  },
  // set background color
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
}

const game = new Phaser.Game(config)

// load scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)

// start title
game.scene.start('splashScene')
