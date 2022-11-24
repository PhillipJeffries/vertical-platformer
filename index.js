const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
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



const animate = () => {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
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