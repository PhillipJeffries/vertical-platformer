import { Player } from "./classes/Player.js"
import { Sprite } from "./classes/Sprite.js"
import { CollisionBlock } from "./classes/CollisionBlock.js"
import { floorCollisions, platformCollisions } from "./data/collisions.js"
import { keys,gravity } from "./data/data.js"



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const floorCollisions2D = []

for(let i = 0; i < floorCollisions.length; i += 36){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
    // console.log(floorCollisions2D)
}

console.log("floorCollisions2d length", floorCollisions2D.length)

const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 1729) {
            console.log("draw here", x)
            collisionBlocks.push(
                new CollisionBlock(c, {x:x*16, y:y*16})
            )
        }

    })
})

const platformCollisions2D = []

for(let i = 0; i<platformCollisions.length; i+=36){
    platformCollisions2D.push(platformCollisions.slice(i, i+36))
}
console.log("platform collisions array", platformCollisions2D)


const platformCollisionBlocks = []

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 1729) {
            // console.log("draw here")
            platformCollisionBlocks.push(
                new CollisionBlock(c, {x:x*16, y:y*16})
            )
        }

    })
})

 1






const player = new Player({
    c, 
    position: {x: 100, y: 0}, 
    collisionBlocks, 
    gravity,
    imageSrc: "./img/warrior/Idle.png"
})
// const player2 = new Player({x: 150, y: 0})


const background = new Sprite(
    {
        c: c,
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './img/background.png'
    }
)



const animate = () => {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + canvas.height/4)
    background.update()
    
    collisionBlocks.forEach((collisionBlock)=>{
        collisionBlock.update()
    })

    platformCollisionBlocks.forEach((block)=>{
        block.update()
    })
    
    player.update()

    let acceleration = .3

    if(!keys.a.pressed && !keys.d.pressed){
        player.velocity.x = 0 //to stop player after movement

    }

    if(keys.d.pressed) {
        
        player.velocity.x += acceleration

    }
    else if (keys.a.pressed) player.velocity.x = player.velocity.x - acceleration


    c.restore()
    
    



    
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
            player.velocity.y = -10
            break
    }
})

window.addEventListener('keyup', (e)=>{
    // console.log(e)
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

// console.log(floorCollisions)