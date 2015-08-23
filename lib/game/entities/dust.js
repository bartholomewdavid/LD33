ig.module(
  'game.entities.dust'
  )
  .requires(
    'impact.entity',
    'game.plugins.underscore'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityDust = ig.Entity.extend({
      // Set some of the properties
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.NONE,
      zIndex: 75,
      name: 'Dust',
      gravityFactor: 0,
      alpha: 0,
      canvas: null,
      ctx: null,
      size: { x: 32, y: 32 },
      offset: { x: 0, y: 0 },

      // Load an animation sheet
      animSheet: null,

      init: function (x, y, settings) {
        this.animSheet = new ig.AnimationSheet('media/dust.png', 32, 32),
        setTimeout(function() {
          this.kill()
        }.bind(this), _.random(6000, 10000))
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
        this.addAnim('idle', 0.1, [0])
        this.vel.y = -(_.random(12, 20))
        this.vel.x = (_.random(-16, 16))
        this.currentAnim = this.anims.idle
        this.currentAnim.angle = _.random(1, 314) / 100
        this.alpha = _.random(80, 100) / 100
        this.parent(x,y,settings)
      },

      update: function() {
        this.parent()
      },

      draw: function() {
        this.alpha = (this.alpha > 0.1) ? this.alpha -= 0.001 : 0.1;
        this.currentAnim.angle += .001
        this.ctx.save()
        this.ctx.globalAlpha = this.alpha
        this.parent()
        this.ctx.restore()
      }
  })
})