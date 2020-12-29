def on_b_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
    """),
        mySprite,
        100,
        20)
    projectile.start_effect(effects.fire)
    statusbar.value += -4
    music.pew_pew.play()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
    """),
        mySprite,
        100,
        -20)
    projectile.start_effect(effects.fire)
    statusbar.value += -2
    music.pew_pew.play()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_zero(status):
    game.over(False)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_on_zero2(status):
    game.over(False)
statusbars.on_zero(StatusBarKind.energy, on_on_zero2)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    music.jump_down.play()
    info.change_life_by(-1)
    statusbar2.value += -10
    otherSprite.destroy(effects.fire, 500)
    scene.camera_shake(6, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

EnemyShip: Sprite = None
projectile: Sprite = None
statusbar2: StatusBarSprite = None
statusbar: StatusBarSprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
"""),
    SpriteKind.player)
mySprite.set_position(randint(10, 80), 50)
controller.move_sprite(mySprite)
mySprite.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
info.set_life(5)
statusbar = statusbars.create(20, 4, StatusBarKind.energy)
statusbar.value = 100
statusbar.set_color(7, 2)
statusbar.set_label("Energy")
statusbar.attach_to_sprite(mySprite, -65, 50)
statusbar2 = statusbars.create(20, 4, StatusBarKind.health)
statusbar2.value = 100
statusbar2.set_color(7, 2)
statusbar2.set_label("Health")
statusbar2.attach_to_sprite(mySprite, -65, -50)

def on_update_interval():
    global EnemyShip
    EnemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    EnemyShip.x = scene.screen_width()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screen_height() - 10)
    EnemyShip.follow(mySprite, 4)
game.on_update_interval(5000, on_update_interval)
