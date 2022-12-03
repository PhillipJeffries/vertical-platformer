import { collision, platformCollision } from "../utils.js"
import { Sprite } from "./Sprite.js"


export class Player extends Sprite {
    constructor({c, position, collisionBlocks, platformCollisionBlocks, gravity, imageSrc, frameRate, scale = 1, animations }) {
        super({imageSrc, frameRate, scale})
        this.c = c
        this.position = position
        this.velocity = {x: 0, y: 0}
        // this.width = 100/4
        // this.height = 100/4
        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.gravity = gravity
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height: 10
        }

        this.animations = animations
        this.lastDirection = "right"

        for ( let key in this.animations ) {
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }

        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y + this.height
            },
            width: 500,
            height: 400
        }
    }


    switchSprite(key){
        if (this.image === this.animations[key].image || !this.loaded) return

        this.currentFrame = 0

        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }


    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x +140,
                y: this.position.y + 150
            },
            width: 500,
            height: 500
        }
    }


    checkForHorisontalCanvasCollision(){
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1536 || 
            this.hitbox.position.x + this.velocity.x <= 0
            ){
            this.velocity.x = 0
        }
        // if (this.hitbox.position.x < 0){
        //     this.velocity.x = 0
        // }
    }


    shouldPanCameraToTheLeft({canvas, camera}){
        const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width
        const scaledDownCanvasWidth = canvas.width
        if(cameraboxRightSide >= 1536) return

        if(cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)){
            camera.position.x -= this.velocity.x
            console.log('left')
        }

    }

    shouldPanCameraToTheRight({canvas, camera}){
        if(this.cameraBox.position.x <= 0) return

        if(this.cameraBox.position.x <= Math.abs(camera.position.x)){
            camera.position.x -= this.velocity.x
        }

    }

    shouldPanCameraDown({canvas, camera}){
        if(this.cameraBox.position.y + this.velocity.y <= 0) return

        if(this.cameraBox.position.y <= Math.abs(camera.position.y)){
            camera.position.y -= this.velocity.y
        }

    }

    shouldPanCameraUp({canvas, camera}){
        // if(this.cameraBox.position.y + this.velocity.y <= 0) return

        const scaledCanvasHeight = canvas.height

        if(this.cameraBox.position.y + this.cameraBox.height >= 
            Math.abs(camera.position.y) + scaledCanvasHeight
            )
        {
            camera.position.y -= this.velocity.y
        }

    }


    

    
    // draw() {
    //     this.c.fillStyle = 'red'
    //     this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    update() {
        this.updateFrames()
        this.updateHitbox()
        this.updateCameraBox()


        // this.c.fillStyle = 'rgba(0, 255, 0, .3)'
        // this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // this.c.lineWidth = 50
        // this.c.strokeStyle = "rgba(32, 190, 50, .5)"
        // this.c.strokeRect(this.position.x, this.position.y, this.width, this.height)

        // this.c.fillStyle = 'rgba(0, 0, 255, .2)'
        // this.c.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height,
        // )

        // this.c.fillStyle = 'rgba(0, 255, 0, .2)'
        // this.c.fillRect(
        //     this.cameraBox.position.x,
        //     this.cameraBox.position.y,
        //     this.cameraBox.width,
        //     this.cameraBox.height,
        // )

        this.draw()
        this.check()
        
        this.position.x += this.velocity.x
        this.applyGravity()
        this.checkForHorisontalCollisions()
        this.updateHitbox()
        this.checkForVerticalCollisions()  
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 355,
                y: this.position.y + 220
            },
            width: 80,
            height: 280
        }
    }


    checkForHorisontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                platformCollision({
                    object1: this.hitbox,
                    object2: collisionBlock
                })
            ){
                if (this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - .01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + .01
                    break
                }
                // console.log("collision")
            }
        }
        
    }


    
    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }



    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock
                })
            ){
                if (this.velocity.y > 0) { //if collision below
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - .01
                }
                if (this.velocity.y < 0) { //if collision above
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + .01
                }
                // console.log("collision")
            }
        }

        //platformCollisionBlocks
        for(let i = 0; i < this.platformCollisionBlocks.length; i++){
            const platformCollisionBlock = this.platformCollisionBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock
                })
            ){
                if (this.velocity.y > 0) { //if collision below
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = platformCollisionBlock.position.y - offset - .01
                }
                
                // console.log("collision")
            }
        }
        
    }

}