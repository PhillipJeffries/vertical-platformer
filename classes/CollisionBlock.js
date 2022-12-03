export class CollisionBlock {
    constructor(c, position, width=16, height=16) {
        this.c = c
        this.position = position
        this.width = width
        this.height = height
    }

    draw() {
        this.c.fillStyle = 'rgba(255, 0, 0, .5)'
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()        
    }

}