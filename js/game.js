/* global Phaser */

//* Copyright (c) 2023 Dominic M. Mohamad T. All rights reserved
//
// Created by: Dominic M. Mohamad T.
// Created on: June 2023
// This is the Phaser3 game configuration file

// scene import statements
import SplashScene from "./js/splashScene.js"
import TitleScene from "./js/titleScene.js"
import MenuScene from "./js/menuScene.js"
import GameScene from "./js/gameScene.js"

// Our game scene
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    },
  },
  // set background color
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    //we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

const game = new Phaser.Game(config)

// load scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)

// start title
game.scene.start ('splashScene')
