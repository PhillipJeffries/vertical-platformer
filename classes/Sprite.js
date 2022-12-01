export class Sprite {
    constructor({c, position, imageSrc}) {
        this.c = c
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    check(){
        console.log(this.c)
    }

    draw() {
        if (!this.image) return
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}
