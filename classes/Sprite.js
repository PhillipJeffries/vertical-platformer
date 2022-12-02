export class Sprite {
    constructor({
            c,
            position,
            imageSrc,
            frameRate = 1,
            scale=1
        }) {
        this.c = c
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = 3 //to slow frames update
        this.elapsedFrames = 0
    }

    check(){
        // console.log(this.c)
    }

    draw() {
        if (!this.image) return

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }

        this.c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width ,
            this.height
        )
    }
    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}
