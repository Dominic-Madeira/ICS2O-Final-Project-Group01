/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key:'titleScene'})

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneStyle = { font: '200px Times', fill: '#ff0000', align: 'center' }
  }

  /**
   * Can be defined on your own Scenes.
   * This method is called by the Scene Manager when the scene starts,
   *   before preload() and create().
   *@param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to load assets.
   */
  preload () {
    console.log('Title Scene')
    // this.load.image('titleSceneBackground', './assets/aliens_screen_image.jpg')
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create (data) {
    // this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
    // this.titleSceneBackgroundImage.x = 1920 / 2
    // this.titleSceneBackgroundImage.y = 1080 / 2

    this.titleScene = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Aliens', this.titleSceneStyle).setOrigin(0.5)
  }

  /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
    if (time > 6000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene
