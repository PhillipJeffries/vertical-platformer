const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const floorCollisions2D = []

for(let i = 0; i<floorCollisions.length; i+=36){
    floorCollisions2D.push(floorCollisions.slice(i, i+36))
    // console.log(floorCollisions2D)
}


const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x)=>{
        // console.log(symbol)
        if(symbol === 973) {
            // console.log("draw here")
            collisionBlocks.push(new CollisionBlock({x:x*16, y:y*16}))
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
        if(symbol === 973) {
            // console.log("draw here")
            platformCollisionBlocks.push(new CollisionBlock({x:x*16, y:y*16}))
        }

    })
})


// console.log(collisionBlocks)

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

const gravity = 1






const player = new Player({x: 200, y: 0}, platformCollisionBlocks )
// const player2 = new Player({x: 150, y: 0})


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})



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
    
    c.restore()

    



    player.update()

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

// console.log(floorCollisions)