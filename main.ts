controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 6 . . . . . 
        . . . . . . . . . 6 6 6 . . . . 
        . . . . . . . . 6 6 9 6 6 . . . 
        . . . . . . . 6 6 9 9 9 6 6 . . 
        6 6 6 6 6 6 6 6 9 9 5 9 9 6 6 . 
        9 9 9 9 9 9 9 9 9 5 5 5 9 9 6 6 
        6 6 6 6 6 6 6 6 9 9 5 9 9 6 6 . 
        . . . . . . . 6 6 9 9 9 6 6 . . 
        . . . . . . . . 6 6 9 6 6 . . . 
        . . . . . . . . . 6 6 6 . . . . 
        . . . . . . . . . . 6 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    projectile.startEffect(effects.fire)
    statusbar.value += -40
    music.pewPew.play()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 2 . . . . . 
        . . . . . . . . . 2 2 2 . . . . 
        . . . . . . . 2 2 2 5 2 2 . . . 
        2 2 2 2 2 2 2 2 2 5 5 5 2 2 . . 
        . . . . . . . 2 2 2 5 2 2 . . . 
        . . . . . . . . . 2 2 2 . . . . 
        . . . . . . . . . . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    projectile.startEffect(effects.fire)
    statusbar.value += -2
    music.pewPew.play()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.jumpDown.play()
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(6, 500)
})
let EnemyShip: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 6 6 6 6 6 . . . . 
    . . . . . . 6 6 6 6 6 6 4 . . . 
    . . . . . 6 6 6 6 6 6 6 . . . . 
    . . . . 6 8 8 8 8 8 8 a . . . . 
    . . . 6 6 6 6 6 6 6 a a a . . . 
    . . 6 6 6 6 6 6 6 6 a a a . . . 
    . . . 6 6 6 6 6 6 6 a a a . . . 
    . . . . 6 8 8 8 8 8 8 a . . . . 
    . . . . . 6 6 6 6 6 6 6 . . . . 
    . . . . . . 6 6 6 6 6 6 4 . . . 
    . . . . . . . 6 6 6 6 6 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.value = 100
statusbar.setColor(7, 2)
statusbar.setLabel("Energy")
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 3 3 3 3 3 3 3 3 4 . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . . 2 3 3 3 3 3 3 3 3 4 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screenHeight() - 10)
})
