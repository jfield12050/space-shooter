controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 9 . . . . . 
        . . . . . . . . . 9 9 9 . . . . 
        . . . . . . . . 9 9 5 9 9 . . . 
        9 9 9 9 9 9 9 9 9 5 5 5 9 9 . . 
        . . . . . . . . 9 9 5 9 9 . . . 
        . . . . . . . . . 9 9 9 . . . . 
        . . . . . . . . . . 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    projectile.startEffect(effects.fire)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
})
let EnemyShip: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . 6 4 4 . . 
    . . . . . . . . . 6 6 6 . . . . 
    . . . . . . . 6 6 6 6 6 . . . . 
    . . . . . 6 8 8 8 8 8 a . . . . 
    . . . 6 6 6 6 6 6 6 a a a . . . 
    . . 6 6 6 6 6 6 6 6 a a a . . . 
    . 6 6 6 8 8 8 8 8 8 8 a 4 4 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 3 2 . . . . . 
        . . . . . . . 3 3 3 2 . . . . . 
        . . . . . . 3 3 2 2 2 4 . . . . 
        . . . . 3 3 3 2 2 2 2 4 . . . . 
        . . . 3 3 2 2 2 2 2 2 . . . . . 
        . . . 3 2 2 2 2 2 2 2 . . . . . 
        . . 2 2 2 2 2 2 2 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . . 3 3 2 2 2 2 2 2 4 . . . . 
        . . . . . 3 3 3 2 2 2 4 . . . . 
        . . . . . . . 3 3 3 2 . . . . . 
        . . . . . . . . . . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screenHeight() - 10)
})
