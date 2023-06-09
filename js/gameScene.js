/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the Menu Scene

class GameScene extends Phaser.Scene {

  createPipe () {
    let pipeColor = ""
    // 50/50 chance for pipe color to be green or orange
    
    const holePosition = Phaser.Math.Between(100, screenHeight - 100)
    const topPipe = this.physics.add.sprite(game.config.width, holePosition - tubeSpacing, 'topPipe')
    const bottomPipe = this.physics.add.sprite(game.config.width, holePosition + tubeSpacing, 'bottomPipe')
    this.pipeGroup.add(topPipe)
    this.pipeGroup.add(bottomPipe)
    this.pipeGroup.body.velocity.x = -200
  }

  birdJump () {
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    if (keySpaceObj.isDown === true) {
      if (this.jump === false) {
        this.jump = true
        this.sound.play('wing')
      }
    }

    if (keySpaceObj.isUp === true) {
      wait(500)
      this.jump = false
    }
  }
  
    constructor () {
      super({ key:'gameScene'})
  
      this.background = null 
      this.bird = null
      this.jump = null
      this.score = 0
      this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
      this.gameOverScore = { font: '65px Arial', fill: '#ffffff', align: 'center' }
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
      this.load.audio('die', './assets/audio/die.wav')
      this.load.audio('hit', './assets/audio/hit.wav')
      this.load.audio('point', './assets/audio/point.wav')
      this.load.audio('wing', './assets/audio/wing.wav')
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

      const tubeSpacing = 150
      const tubeWidth = 52


      this.time.addEvent({
        delay: 2000, // Adjust the interval between tube generation
        loop: true,
        callback: createPipe,
        callbackScope: this
      })
    }
    
  
    /**
     * Should be overridden by your own Scenes.
     * This method is called once per game step while the scene is running.
     * @param {number} time - The current time.
     * @param {number} delta - The delta time in ms since the last frame.
     */
    update (time, delta) {
        this.birdJump()

        // Generate more pipes
        pipeGroup.getChildren().forEach(function(createPipe) {
          if (pipeGroup.getBounds().right < 0) {
            // Remove tubes when they are off the screen
            pipeGroup.destroy()
          }
        })
  }
}
export default GameScene
