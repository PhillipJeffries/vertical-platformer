class Player {
    constructor(position, collisionBlocks ) {
        this.position = position
        this.velocity = {x: 0, y: 0}
        this.width = 100
        this.height = 100
        this.collisionBlocks = collisionBlocks
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()
        
        this.position.x += this.velocity.x
        this.applyGravity()
        this.checkForVerticalCollisions()


        
    }
    
    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
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
                // if(this.velocity.y > 0) {
                //     this.velocity.y = 0
                //     this.position.y = collisionBlock.position.y - this.height
                // }
                console.log("collision")
            }
        }
    }

}