 /* this was created by
 BENSON NGULUBE
 https://www.upwork.com/freelancers/~0195074488250a22d4
 */
class TutorialScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TutorialScene' })
    this.textclickhere= null
  }

  preload() {
    this.load.image('background', './assets/background.png')
    this.load.image('planet', './assets/planet.png')
    this.load.image('Hand', './assets/Hand.png')
    this.load.image('textrectangle', './assets/textrectangle.png')
    this.load.image('indicator', './assets/indicator.png')

  }

  create() {
     // Add background
     this.add.image(400, 300, 'background')
   
    // Add planet
   let planet = this.add.sprite(400, 300, 'planet') 

   let textrectangle = this.add.image(408, 115, 'textrectangle')
       textrectangle.setDisplaySize(350, 50); 
  // this is home indicator
   let indicator = this.add.image(380, 658, 'indicator')

   this.textclickhere= this.add.text(245,100, 'Tap on the planet', {fontSize: '32px', alpha: 0})

    // Add animation to make text appear
    this.tweens.add({
      targets: this.textclickhere,
      alpha: 1,
      duration: 1000,
      ease: 'Linear'
    })
    // Enable planet for input
        planet.setInteractive()

    // Add Hand
    let Hand = this.add.sprite(350, 400, 'Hand')
    // Listen for planet tap
    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if (gameObject === planet) {
        // End tutorial and start next stage 
        this.scene.start('GameScene')
      }
    })
    } 
   }

   // THIS IS THE GAME SCENE CODE
   class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        // load assets for the scene here
        this.load.image('background', './assets/background.png')
        this.load.image('planet', './assets/planet.png')
        this.load.image('textrectangle', './assets/textrectangle.png')
        this.load.image('indicator', './assets/indicator.png')
        this.load.spritesheet('burst', './assets/burst.png', {frameWidth:64, frameHeight:64})
    }

    create() {
        // create the scene here
        this.add.image(400, 300, 'background')
        let textrectangle = this.add.image(408, 115, 'textrectangle')
       textrectangle.setDisplaySize(350, 50); 

        let planet = this.add.sprite(400, 300, 'planet')
        planet.setInteractive()

        this.textclickhere= this.add.text(300,100, 'TAP TO PLAY', {fontSize: '32px', alpha: 0})

        let indicator = this.add.image(400, 658, 'indicator')
        
        // Create an animation for the burst spritesheet
        this.anims.create({
            key: 'burst',
            frames: this.anims.generateFrameNumbers('burst', { start: 0, end: 3000 }),
            frameRate: 2,
            repeat: 0
        });

        // Add a pointerup event listener to the planet sprite
        planet.on('pointerup', () => {
            planet.play('burst');
            planet.on('animationcomplete', () => {
                this.scene.start('FinalMap')
            })
        })
    }
  }

// THIS IS THE FINAL MAP SCENE CODE

  class FinalMap extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalMap' })
    }

    preload() {
        // load assets for the scene here
        this.load.image('background', './assets/background.png')
        this.load.image('bigplanet', './assets/bigplanet.png')
        this.load.image('midiumplanet', './assets/midiumplanet.png')
        this.load.image('smallplanet', './assets/smallplanet.png')
        this.load.image('conerplanet', './assets/conerplanet.png')
        this.load.image('indicator', './assets/indicator.png')
        this.load.image('playlink', './assets/playlink.png')
       
    }

    create() {
        // create the scene here
        this.add.image(400, 300, 'background')
        this.add.image(290, 300, 'bigplanet').setScale(0.3)
        this.add.image(520, 400, 'midiumplanet').setScale(0.25)
        this.add.image(320, 450, 'smallplanet').setScale(0.15)
        this.add.image(420, 550, 'playlink').setScale(1)
        this.add.image(233, 630, 'conerplanet').setScale(0.25)
        let indicator = this.add.image(380, 658, 'indicator')

        let textrectangle = this.add.image(408, 115, 'textrectangle')
       textrectangle.setDisplaySize(350, 50)

       this.textclickhere= this.add.text(245,100, 'Download And Play', {fontSize: '32px', alpha: 0})
       
    // Create a button with the text "PLAY NOW"
    let playButton = this.add.text(340, 533, 'PLAY NOW', { fontSize: '32px', fill: '#fff', fontfamily: 'script' })

    // Set the button to be interactive
    playButton.setInteractive()

    // Listen for a click event on the button
    playButton.on('pointerup', function () {
        // Open the app store in a new tab when the button is clicked
        window.open('https://play.google.com/store', '_blank')
    })
    }

}

var config = {
  type: Phaser.AUTO,
  width: 800, 
  height: 700,
  backgroundColor: 0x999999,
  scene: [TutorialScene, GameScene, FinalMap]  
}

var game = new Phaser.Game(config)