import { Player } from "./classes/Player.js"
import { Sprite } from "./classes/Sprite.js"
import { CollisionBlock } from "./classes/CollisionBlock.js"
import { floorCollisions, platformCollisions } from "./data/collisions.js"
import { keys,gravity } from "./data/data.js"



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1536
canvas.height = 976

export const bgSize = {
    width: 1536,
    height: 2560
}

const floorCollisions2D = []

for(let i = 0; i < floorCollisions.length; i += 12){
    floorCollisions2D.push(floorCollisions.slice(i, i + 12))
    // console.log(floorCollisions2D)
}

// console.log("floorCollisions2d length", floorCollisions2D.length)

const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 241) {
            // console.log("draw here", x)
            collisionBlocks.push(
                new CollisionBlock(c, {x:x*128, y:y*128}, 128, 128)
            )
        }

    })
})

const platformCollisions2D = []

for(let i = 0; i<platformCollisions.length; i+=12){
    platformCollisions2D.push(platformCollisions.slice(i, i+12))
}
// console.log("platform collisions array", platformCollisions2D)


const platformCollisionBlocks = []

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 241) {
            // console.log("draw here")
            platformCollisionBlocks.push(
                new CollisionBlock(c, {x:x*128, y:y*128}, 128, 4)
            )
        }

    })
})

 1






const player = new Player({
    c, 
    position: {x: 100, y: 1500}, 
    collisionBlocks, 
    platformCollisionBlocks,
    gravity,
    imageSrc: "./img/warrior/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 100
        },
        IdleLeft: {
            imageSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 100
        },
        Jump: {
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 50,
        },
        JumpLeft: {
            imageSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 50,
        },
        Fall: {
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 50
        },
        FallLeft: {
            imageSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 50
        },
        Run: {
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 8
        },
        RunLeft: {
            imageSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 8
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

const camera = {
    position: {
        x: 0,
        y: -background.image.height + canvas.height
    }
}


const animate = () => {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(1, 1)
    c.translate(camera.position.x, camera.position.y)
    background.update()
    

    //colision blocks render
    // collisionBlocks.forEach((collisionBlock)=>{
    //     collisionBlock.update()
    // })

    // platformCollisionBlocks.forEach((block)=>{
    //     block.update()
    // })
    

    player.checkForHorisontalCanvasCollision()

    player.update()

    let acceleration = .3

    if(!keys.a.pressed && !keys.d.pressed){
        // player.switchSprite('Idle')
        player.velocity.x = 0 //to stop player after movement

    }



    if(keys.d.pressed) {
        player.switchSprite('Run')
        // player.velocity.x += acceleration
        player.velocity.x = 10
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({canvas, camera})
        // player.checkForHorisontalCanvasCollision()
    }
    else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        // player.velocity.x = player.velocity.x - acceleration
        player.velocity.x = -10
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({canvas, camera})
    }
    
    else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
            else player.switchSprite('IdleLeft')
    }

    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({canvas, camera})
        if (player.lastDirection === "right") player.switchSprite('Jump')
            else (player.switchSprite('JumpLeft'))
    } 
    else if (player.velocity.y > 0){
        player.shouldPanCameraUp({canvas, camera})
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
            keys.w.pressed = true
            player.velocity.y = -15
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
       case 'w':
            keys.w.pressed = false
            break
    }
})

// console.log(floorCollisions)

// console.log(c)