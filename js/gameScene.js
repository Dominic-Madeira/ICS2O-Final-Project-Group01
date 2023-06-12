/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the Menu Scene

class GameScene extends Phaser.Scene {

  createPipe () {
    // Generate the pipes
    const holePosition = Phaser.Math.Between(100, 1080 - 100)
    const topPipe = this.physics.add.sprite(1080, holePosition - 160, 'pipe')
    const bottomPipe = this.physics.add.sprite(1080, holePosition + 160 * 2, 'pipe')
    this.pipeGroup.add(topPipe)
    this.pipeGroup.add(bottomPipe)
    topPipe.setScale(4.5)
    bottomPipe.setScale(4.5)
    topPipe.body.velocity.x = -200
    bottomPipe.body.velocity.x = -200

    // randomly pick orange or green
    if (Phaser.Math.Between(0, 1) === 0) {
      this.topPipe.frame(0)
      this.bottomPipe.frame(0)
    } else {
      this.topPipe.frame(1)
      this.bottomPipe.frame(1)
    }
    console.log('Pipe created')
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
      // Audio
      this.load.image('background', './assets/background.png')
      this.load.audio('die', './assets/audio/die.wav')
      this.load.audio('hit', './assets/audio/hit.wav')
      this.load.audio('point', './assets/audio/point.wav')
      this.load.audio('wing', './assets/audio/wing.wav')
      // Pipes
      this.load.spritesheet('pipe', './assets/tileset/pipe.png', {
        frameWidth: 32,
        frameHeight: 160
      })
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

      // this.physics.add.collider(this.bird, this.pipeGroup, function(birdCollide, pipeCollide) {
        
      // }.bind(this))

      this.time.addEvent({
        delay: 2000, // Adjust the interval between tube generation
        loop: true,
        callback: createPipe,
        callbackScope: this
      })

      this.createPipe()
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
