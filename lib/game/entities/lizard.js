ig.module(
  'game.entities.lizard'
  )
  .requires(
    'impact.entity',
    'impact.timer',
    'game.entities.lizardpunch'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityLizard = ig.Entity.extend({
      // Set some of the properties
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.NONE,
      zIndex: 100,
      name: 'Lizard',
      animationTimer: null,

      size: { x: 128, y: 128 },
      offset: { x: 0, y: -16 },

      // Load an animation sheet
      animSheet: new ig.AnimationSheet('media/lizard_bitch.png', 128, 128),

      init: function (x, y, settings) {
        // Add animations for the animation sheet
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.X, 'punch');
        ig.input.bind(ig.KEY.C, 'kick');

        this.addAnim('idle', 0.1, [0]);
        this.addAnim('walk', 0.3, [0,4]);
        this.addAnim('punch', 0.3, [1,1,1]);
        this.addAnim('kick', 0.3, [2,2,2]);

        this.animationTimer = new ig.Timer()

        // Call the parent constructor
        this.parent(x, y, settings);
      },

      update: function () {
        this.parent();

        if (this.animationTimer.delta() < 0) {
          return;
        }

        if (ig.input.state('left')) {
          this.vel.x = -64;
          this.anims.idle.flip.x = true;
          this.anims.walk.flip.x = true;
          this.anims.punch.flip.x = true;
          this.anims.kick.flip.x = true;
          this.currentAnim = this.anims.walk;
        } else if (ig.input.state('right')) {
          this.vel.x = 64;
          this.flipped = false
          this.anims.idle.flip.x = false;
          this.anims.walk.flip.x = false;
          this.anims.punch.flip.x = false;
          this.anims.kick.flip.x = false;
          this.currentAnim = this.anims.walk;
        } else {
          this.vel.x = 0;
          this.currentAnim = this.anims.idle;
        }

        if (ig.input.pressed('punch')) {
          var offset = (this.anims.punch.flip.x) ? false : true
          ig.game.spawnEntity(EntityLizardpunch, this.pos.x+(128*offset), this.pos.y+64-this.offset.y, {});
          this.currentAnim = this.anims.punch;
          this.animationTimer.set(.9) // .3 * 4 frames
          this.vel.x = 0;
        }
        if (ig.input.pressed('kick')) {
          var offset = (this.anims.punch.flip.x) ? false : true
          ig.game.spawnEntity(EntityLizardpunch, this.pos.x+(128*offset), this.pos.y+96-this.offset.y, {});
          this.currentAnim = this.anims.kick;
          this.animationTimer.set(.9) // .3 * 4 frames
          this.vel.x = 0;
        }
      }
    });
  })