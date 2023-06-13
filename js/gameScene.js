/* global Phaser */

// Copyright (c) 2023 Dominic M. All rights reserved
//
// Created by: Dominic M.
// Created on: Apr 2023
// This is the game Scene

class GameScene extends Phaser.Scene {

    createPipe () {
    // Generate the pipes
    let holePosition = Phaser.Math.Between(150, 1080 - 425)
    const topPipe = this.physics.add.sprite(1920, holePosition - 330, 'pipe')
    const bottomPipe = this.physics.add.sprite(1920, holePosition + 330 * 2, 'pipe')
    this.topPipeGroup.add(topPipe)
    this.bottomPipeGroup.add(bottomPipe)
    // Change size
    topPipe.setScale(4.5)
    bottomPipe.setScale(4.5)
    // Make them move
    topPipe.body.velocity.x = -200
    bottomPipe.body.velocity.x = -200

    // randomly pick orange or green
    if (Phaser.Math.Between(0, 1) === 0) {
      topPipe.setFrame(0)
      bottomPipe.setFrame(0)
    } else {
      topPipe.setFrame(1)
      bottomPipe.setFrame(1)
    }
    console.log('Pipe created')
  }

  createFloor () {
    // Generate the floor
    const floor = this.physics.add.sprite(1920 / 2, 1080, 'floor')
    this.floorGroup.add(floor)
    floor.body.immovable = true
    floor.body.velocity.x = -200
    floor.setScale(5.0)
    console.log('Floor created')
  }

  birdJump () {
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    if (keySpaceObj.isDown === true) {
      if (this.jump === false) {
        // fire missile
        this.jump = true
        this.bird.setVelocityY(-500)
        this.sound.play('wing')
      }
    }

    if (keySpaceObj.isUp === true) {
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
      this.load.image('gameSceneBackground', './assets/background.png')
      this.load.audio('die', './assets/audio/die.wav')
      this.load.audio('hit', './assets/audio/hit.wav')
      this.load.audio('point', './assets/audio/point.wav')
      this.load.audio('wing', './assets/audio/wing.wav')
      // Pipes
      this.load.spritesheet('pipe', './assets/tileset/pipe.png', {
        frameWidth: 32,
        frameHeight: 160
      })
      this.load.spritesheet('bird', './assets/player/bird1.png', {
        frameWidth: 16,
        frameHeight: 15
      })
      this.load.image('floor', './assets/tileset/floor.png')
    }
  
    /**
     * Can be defined on your own Scenes.
     * Use it to create your game objects.
     * @param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
     */
    create (data) {
      // First side of background
      this.menuSceneBackgroundImage = this.add.sprite(1920 - 170, 1080 / 2 - 100, 'menuSceneBackground')
      this.menuSceneBackgroundImage.setScale(5.0)
      // Second side of background
      this.menuSceneBackgroundImage2 = this.add.sprite((1920 / 2) / 2, 1080 / 2 - 100, 'menuSceneBackground')
      this.menuSceneBackgroundImage2.setScale(5.0)

      this.scoreText = this.add.text(16, 16, 'Score: 0', this.scoreTextStyle)

      this.bird = this.physics.add.sprite(1920 / 2 - 200, 1080 / 2, 'bird').setScale(5.0)
      this.bird.setGravityY(1000)
      this.bird.setFrame(0)

      this.topPipeGroup = this.physics.add.group()
      this.bottomPipeGroup = this.physics.add.group()
      this.createPipe()

      // this.physics.add.collider(this.bird, this.pipeGroup, function(birdCollide, pipeCollide) {
        
      // }.bind(this))
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
          // this.scene.restart()
        } else if (this.bird.y < 0) {
          this.bird.y = 1
        }

        // Generate more pipes
        this.topPipeGroup.getChildren().forEach((topPipe) => {
          if (topPipe.x < 0) {
            topPipe.destroy()
            this.createPipe()
          }
        })

        this.bottomPipeGroup.getChildren().forEach((bottomPipe) => {
          if (bottomPipe.x < 0) {
            bottomPipe.destroy()
          }
          if (bottomPipe.x < this.bird.x && bottomPipe.x > this.bird.x - 4) {
            let stop = false
            if (stop === false) {
            stop = true
            this.score += 1
            this.scoreText.setText('Score: ' + this.score)
            this.sound.play('point')
            this.createPipe()
          }}
        })
  }
}
export default GameScene
