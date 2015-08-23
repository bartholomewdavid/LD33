ig.module(
    'game.entities.lizardpunch'
    )
    .requires(
        'impact.game',
        'impact.entity'
        )
    .defines(function () {
        // Create your own entity, subclassed from ig.Enitity
        EntityLizardpunch = ig.Entity.extend({
            // Set some of the properties
            collides: ig.Entity.COLLIDES.NEVER,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            zIndex: 1500,
            name: 'Lizard Punch',
            enabled: null,

            size: { x: 1, y: 1 },
            offset: { x: 0, y: 16},
            soundPunch: null,
            // Load an animation sheet
            animSheet: new ig.AnimationSheet('media/pow.png', 32, 32),

            init: function (x, y, settings) {
                this.soundPunch = new ig.Sound( 'media/jab.mp3' );
                this.parent(x, y, settings);
                this.addAnim('derp', 0.1, [-1])
                this.addAnim('idle', 0.1, [0])
                this.currentAnim = this.anims.derp
                this.enabled = true

                setTimeout(function() {
                  this.kill()
                }.bind(this), 500)
            },

            check: function(other) {
              if (this.enabled) {
                if (other) {
                  this.currentAnim = this.anims.idle
                  this.enabled = false
                  other.receiveDamage(1, this);
                  ig.game.shake(true);
                  this.soundPunch.play();
                  this.enabled = false
                }
              }
            },

            update: function () {
            }
        });
    })