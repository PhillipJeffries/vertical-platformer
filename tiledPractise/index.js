const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600


// console.log(canvas)

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

const gravity = 1


class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}


class Player {
    constructor(position, velocity = {x: 0, y: 0}) {
        this.position = position
        this.velocity = velocity
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y < canvas.height) 
            this.velocity.y += gravity
        else this.velocity.y = 0
        
    }

}

const player = new Player({x: 0, y: 0})
const player2 = new Player({x: 150, y: 0})


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './textures/tilesets/first.png'
})


const animate = () => {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // c.save()
    // c.translate(0, -background.image.height + canvas.height)
    background.update()
    // c.restore()

    player.update()
    player2.update()

    player.velocity.x = 0
    if(keys.d.pressed) player.velocity.x = 1
    else if (keys.a.pressed) player.velocity.x = -1
}

animate()

window.addEventListener('keydown', (e)=>{
    console.log(e)
    switch (e.key){
        case 'd':
            keys.d.pressed = true
            console.log(keys.d)
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -15
            break
    }
})

window.addEventListener('keyup', (e)=>{
    console.log(e)
    switch (e.key){
        case 'd':
            keys.d.pressed = false
            console.log(keys.d)
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})