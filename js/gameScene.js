/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the game Scene

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
        this.bird.body.velocity.y = -600
        // wait (500)
        // this.bird.body.velocity.y = 400
      }
    }

    if (keySpaceObj.isUp === true) {
      console.log('test')
      this.jump = false
      this.bird.body.velocity.y = 600

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
      this.load.image('gameSceneBackground', './assets/background.png')
      this.load.image('bird', './assets/player/bird1.png')
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
      this.gameSceneBackgroundImage = this.add.sprite(0, 0, 'gameSceneBackground')
      this.gameSceneBackgroundImage.x = 1920 - 170
      this.gameSceneBackgroundImage.y = 1080 / 2 - 100
      this.gameSceneBackgroundImage.setScale(5.0)

      this.scoreText = this.add.text(16, 16, 'Score: 0', this.scoreTextStyle)

      this.bird = this.physics.add.sprite(100, 1080 / 2, 'bird').setScale(5.0)

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

        if (this.bird.y > 1080) {
          this.sound.play('hit')
          this.scene.restart()
        } else if (this.bird.y < 0) {
          this.bird.y = 1
        }

        // Generate more pipes
        this.pipeGroup.getChildren().forEach(function(pipe) {
          if (pipe.getBounds().right < 0) {
            pipe.destroy()
          }
        }
        )
  }
}
export default GameScene
