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

// console.log("floorCollisions2d length", floorCollisions2D.length)

const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 1729) {
            // console.log("draw here", x)
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
// console.log("platform collisions array", platformCollisions2D)


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
    position: {x: 100, y: 300}, 
    collisionBlocks, 
    gravity,
    imageSrc: "./img/warrior/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3
        },
        IdleLeft: {
            imageSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3
        },
        Jump: {
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3
        },
        FallLeft: {
            imageSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3
        },
        Run: {
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 3
        },
        RunLeft: {
            imageSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 2
        }
    }
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
        // player.switchSprite('Idle')
        player.velocity.x = 0 //to stop player after movement

    }



    if(keys.d.pressed) {
        player.switchSprite('Run')
        // player.velocity.x += acceleration
        player.velocity.x += acceleration
        player.lastDirection = 'right'
    }
    else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = player.velocity.x - acceleration
        player.lastDirection = 'left'
    }
    
    else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
            else player.switchSprite('IdleLeft')
    }

    if (player.velocity.y < 0) {
        if (player.lastDirection === "right") player.switchSprite('Jump')
            else (player.switchSprite('JumpLeft'))
    }
    else if (player.velocity.y > 0){
        if (player.lastDirection === "right") player.switchSprite('Fall')
        else player.switchSprite('FallLeft')
    }
    c.restore()
    
    



    
}

animate()

window.addEventListener('keydown', (e)=>{
    console.log(e)
    switch (e.key){
        case 'd':
            keys.d.pressed = true
            // console.log(keys.d)
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
            // console.log(keys.d)
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})

// console.log(floorCollisions)

// console.log(c)