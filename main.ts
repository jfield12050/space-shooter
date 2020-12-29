sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
    statusbar.value += 2
    statusbar2.value += 2
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 6 . . . . . 
        . . . . . . . . . 6 6 6 . . . . 
        . . . . . . . . 6 6 9 6 6 . . . 
        . . . . . . . 6 6 9 9 9 6 6 . . 
        6 6 6 6 6 6 6 6 9 9 5 9 9 6 6 . 
        9 9 9 9 9 9 9 9 9 5 2 5 9 9 6 6 
        9 9 9 9 9 9 9 9 9 5 2 5 9 9 6 6 
        6 6 6 6 6 6 6 6 9 9 5 9 9 6 6 . 
        . . . . . . . 6 6 9 9 9 6 6 . . 
        . . . . . . . . 6 6 9 6 6 . . . 
        . . . . . . . . . 6 6 6 . . . . 
        . . . . . . . . . . 6 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 10, 0)
    projectile.startEffect(effects.fire)
    statusbar.value += -4
    music.pewPew.play()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 2 . . . . . 
        . . . 3 3 3 3 3 3 2 5 2 . . . . 
        2 2 2 2 2 2 2 2 2 5 6 5 2 . . . 
        2 2 2 2 2 2 2 2 2 5 6 5 2 . . . 
        . . . 3 3 3 3 3 3 2 5 2 . . . . 
        . . . . . . . . . . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 10, 0)
    projectile.startEffect(effects.fire)
    statusbar.value += -1
    music.pewPew.play()
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false)
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    music.powerDown.play()
    EnemyShip.setKind(SpriteKind.Food)
    info.changeLifeBy(1)
    statusbar.value += 10
    statusbar2.value += 10
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.jumpDown.play()
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(6, 500)
    info.changeLifeBy(-1)
    statusbar2.value += -10
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
let EnemyShip: Sprite = null
let projectile: Sprite = null
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . 6 6 6 6 6 6 4 . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . 6 8 8 8 8 8 8 a . . . . . . 
    . 6 6 6 6 6 6 6 a a a . . . . . 
    6 6 6 6 6 6 6 6 a a a . . . . . 
    . 6 6 6 6 6 6 6 a a a . . . . . 
    . . 6 8 8 8 8 8 8 a . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . . 6 6 6 6 6 6 4 . . . . . 
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(randint(10, 80), 50)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.value = 100
statusbar.setColor(7, 2)
statusbar.setLabel("E")
statusbar.attachToSprite(mySprite, -25, 50)
statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
statusbar2.value = 100
statusbar2.setColor(7, 2)
statusbar2.setLabel("H")
statusbar2.attachToSprite(mySprite, -25, 10)
let X_Pos1 = 0
game.onUpdateInterval(1000, function () {
    X_Pos1 = randint(20, scene.screenHeight() - 20)
    mySprite.setPosition(0, X_Pos1)
})
game.onUpdateInterval(500, function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 3 3 3 3 3 3 3 3 4 
        . . . . . 2 2 2 2 2 2 2 2 2 2 . 
        . . . . . . 2 3 3 3 3 3 3 3 3 4 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = -20
    EnemyShip.y = randint(0, scene.screenHeight() - 0)
    EnemyShip.follow(mySprite, 5)
})
