/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the Menu Scene

class GameScene extends Phaser.Scene {

    createAlien () {
      const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920
      let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
      alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
      const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
      anAlien.body.velocity.y = 200
      anAlien.body.velocity.x = alienXVelocity
      this.alienGroup.add(anAlien)
    }
  
    constructor () {
      super({ key:'gameScene'})
  
      this.background = null
      this.ship = null
      this.fireMissile = null
      this.score = 0
      this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
      this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
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
      console.log('Game Scene')
    }
  
    /**
     * Can be defined on your own Scenes.
     * Use it to create your game objects.
     * @param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
     */
    create (data) {
    }
    
  
    /**
     * Should be overridden by your own Scenes.
     * This method is called once per game step while the scene is running.
     * @param {number} time - The current time.
     * @param {number} delta - The delta time in ms since the last frame.
     */
    update (time, delta) {
        const keySpaceObj = this.input.keyboard.addKey('SPACE')
    }
  }
  
  export default GameScene
  