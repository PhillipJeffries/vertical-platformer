import { collision } from "../utils.js"
import { Sprite } from "./Sprite.js"

export class Player extends Sprite {
    constructor({c, position, collisionBlocks, gravity, imageSrc }) {
        super({imageSrc})
        this.c = c
        this.position = position
        this.velocity = {x: 0, y: 0}
        this.width = 100/4
        this.height = 100/4
        this.collisionBlocks = collisionBlocks
        this.gravity = gravity
    }

    // draw() {
    //     this.c.fillStyle = 'red'
    //     this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    update() {
        this.draw()
        this.check()
        
        this.position.x += this.velocity.x
        this.checkForHorisontalCollisions()
        this.applyGravity()
        this.checkForVerticalCollisions()  
    }



    checkForHorisontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock
                })
            ){
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - .01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + .01
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
                    object1: this,
                    object2: collisionBlock
                })
            ){
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - .01
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + .01
                }
                // console.log("collision")
            }
        }
        
    }

}