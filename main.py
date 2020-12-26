def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        mySprite,
        200,
        0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    info.change_life_by(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.camera_shake(4, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

EnemyShip: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(mySprite)
mySprite.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
info.set_life(5)

def on_update_interval():
    global EnemyShip
    EnemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    EnemyShip.x = scene.screen_width()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screen_height() - 10)
game.on_update_interval(2000, on_update_interval)
