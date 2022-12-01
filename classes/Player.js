import { collision } from "../utils.js"
import { Sprite } from "./Sprite.js"

export class Player extends Sprite {
    constructor({c, position, collisionBlocks, gravity, imageSrc, frameRate, scale = .5 }) {
        super({imageSrc, frameRate, scale})
        this.c = c
        this.position = position
        this.velocity = {x: 0, y: 0}
        // this.width = 100/4
        // this.height = 100/4
        this.collisionBlocks = collisionBlocks
        this.gravity = gravity
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height: 10
        }
    }

    
    // draw() {
    //     this.c.fillStyle = 'red'
    //     this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    update() {
        this.updateFrames()
        this.updateHitbox()


        this.c.fillStyle = 'rgba(0, 255, 0, .3)'
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // this.c.lineWidth = 50
        // this.c.strokeStyle = "rgba(32, 190, 50, .5)"
        // this.c.strokeRect(this.position.x, this.position.y, this.width, this.height)

        this.c.fillStyle = 'rgba(0, 255, 0, .2)'
        this.c.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height,
        )

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
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27
        }
    }


    checkForHorisontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
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
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
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
        
    }

}