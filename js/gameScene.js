/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the Menu Scene

class GameScene extends Phaser.Scene {

  createPipe () {
    const holeLocation = Math.floor(Math.random() * 780) + 201 // this will get a number between 200 and 980
    const topPipe = this.physics.add.sprite(2000, holeLocation -100, 'topPipe')
    const bottomPipe = this.physics.add.sprite(2000, holeLocation +100, 'bottomPipe')
    this.pipeGroup.add(topPipe)
    this.pipeGroup.add(bottomPipe)
  }
  
    constructor () {
      super({ key:'gameScene'})
  
      this.background = null 
      this.bird = null
      this.jump = null
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

      this.load.image('background', './assets/background.png')

      this,load.audio('die', './assets/audio/die.wav')
      this,load.audio('hit', './assets/audio/hit.wav')
      this,load.audio('point', './assets/audio/point.wav')
      this,load.audio('wing', './assets/audio/wing.wav')
    }
  
    /**
     * Can be defined on your own Scenes.
     * Use it to create your game objects.
     * @param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
     */
    create (data) {
      this.background = this.add.image(0, 0, 'background')
      this.background.setOrigin(0, 0)

      this.scoreText = this.add.text(16, 16, 'Score: 0', this.scoreTextStyle)

      this.bird = this.physics.add.sprite(100, 1080 / 2, 'bird')

      this.pipeGroup = this.physics.add.group()
      this.createPipe()

      this.physics.add.collider(this.bird, this.pipeGroup, function(birdCollide, pipeCollide) {
        
      }.bind(this))




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
  