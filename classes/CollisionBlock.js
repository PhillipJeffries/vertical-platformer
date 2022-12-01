export class CollisionBlock {
    constructor(c, position) {
        this.c = c
        this.position = position
        this.width = 16
        this.height = 16
    }

    draw() {
        this.c.fillStyle = 'rgba(255, 0, 0, .5)'
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()        
    }

}