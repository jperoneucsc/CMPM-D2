class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    preload(){
        this.load.image("kitchen", "FirstScene.png");
        this.load.image("lobster", "Lobster.png");
    }
    onEnter() {
        let kitchen = this.add.sprite(720,540, "kitchen");
        kitchen.scale = 6;

        let lobster1 = this.add.sprite(850, 890, "lobster");
        lobster1.scale = 6;
        lobster1.setInteractive().on('pointerover', () => this.showMessage("You."))
        .on('pointerdown', () => {
            this.showMessage("Lobster Time!");
            this.tweens.add({
                targets: lobster1,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        });

        let rectangle = this.add.rectangle(675, 650, 200, 600);
        rectangle.setInteractive().on('pointerover', () => this.showMessage("A plant... for escaping?"))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: lobster1,
                x: rectangle.x,
                delay: 100,
                y: rectangle.y - 500,
                repeat: 0,
                yoyo: false,
                duration: 1000
            });
            this.gotoScene(Demo2);
        })

        //let lobster2 = this.add.sprite(1050, 880, "lobster");
        //lobster2.scale = 6;
/*
        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })
*/

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(0,0, "Adventure awaits!");
        this.add.text(0,25, "Click anywhere to begin.");
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

