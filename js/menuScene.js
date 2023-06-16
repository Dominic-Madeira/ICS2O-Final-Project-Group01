/* global Phaser */

// Copyright (c) 2023 Dominic M. Mohamad T. All rights reserved
//
// Created by: Dominic M. Mohamad T.
// Created on: Apr 2023
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  /**
   * Can be defined on your own Scenes.
   * This method is called by the Scene Manager when the scene starts,
   *   before preload() and create().
   *@param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log("Menu Scene");
    this.load.image("menuSceneBackground", "./assets/background.png");
    this.load.image("startButton", "./assets/userInterface/startButton.png");
    this.load.image("floor", "./assets/tileset/floor.png");
    this.load.image("title", "./assets/userInterface/title.png");
    this.load.image("birdImage", "./assets/player/bird1.png");
    this.load.spritesheet("testPipe", "./assets/tileset/pipe.png", {
      frameWidth: 32,
      frameHeight: 160,
    });
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    // Right side of background
    this.menuSceneBackgroundImage = this.add.sprite(
      1920 - 170,
      1080 / 2 - 100,
      "menuSceneBackground"
    );
    this.menuSceneBackgroundImage.setScale(5.0);
    // Left side of background
    this.menuSceneBackgroundImage2 = this.add.sprite(
      1920 / 2 / 2,
      1080 / 2 - 100,
      "menuSceneBackground"
    );
    this.menuSceneBackgroundImage2.setScale(5.0);

    // Place button in the middle of the screen
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 300, "startButton");
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", () => this.clickButton());
    this.startButton.on("pointerover", () =>
      this.startButton.setTint(0x808080)
    );
    this.startButton.on("pointerout", () => this.startButton.clearTint());
    this.startButton.setScale(5);

    // Add pipes
    this.menuPipe = this.add.sprite(1920 / 6, 1080 - 200, "testPipe");
    this.menuPipe.setFrame(0);
    this.menuPipe.setScale(4.5);

    this.menuPipe2 = this.add.sprite(1920 / 6, -30, "testPipe");
    this.menuPipe2.setFrame(0);
    this.menuPipe2.setScale(4.5);

    this.menuPipe3 = this.add.sprite(1920 - 1920 / 6, 150, "testPipe");
    this.menuPipe3.setFrame(1);
    this.menuPipe3.setScale(4.5);

    this.menuPipe4 = this.add.sprite(1920 - 1920 / 6, 1080, "testPipe");
    this.menuPipe4.setFrame(1);
    this.menuPipe4.setScale(4.5);

    // Add floor
    this.floor = this.add.sprite(1920 / 2, 1080 - 30, "floor");
    this.floor2 = this.add.sprite(1920 / 6, 1080 - 30, "floor");
    this.floor3 = this.add.sprite(1920 - 1920 / 6, 1080 - 30, "floor");
    this.floor.setScale(5.3);
    this.floor2.setScale(5.3);
    this.floor3.setScale(5.3);

    // Add title
    this.title = this.add.sprite(1920 / 2, 1080 / 2 - 300, "title");
    this.title.setScale(0.15);

    // Add bird image
    this.birdImage = this.add.sprite(1920 / 2, 1080 / 2 - 100, "birdImage");
    this.birdImage.setScale(6);
  }

  /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    // pass
  }
  clickButton() {
    // Starts the Game
    this.scene.switch("gameScene");
  }
}

export default MenuScene;
