ig.module(
  'game.entities.buildingblock'
  )
  .requires(
    'impact.entity',
    'impact.game',
    'game.plugins.underscore',
    'game.entities.dust'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityBuildingblock = ig.Entity.extend({
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      props: [],
      zIndex: 25,
      gravityFactor: 0,
      name: 'Building Block',
      initialAnim: '',

      // TODO SIZE NEEDS TO BE DETERMINED BY LAYERS
      size: { x: 32, y: 32 },

      // Load an animation sheet
      animSheet: new ig.AnimationSheet('media/buildings.png', 32, 32),

      init: function (x, y, settings) {
        this.addAnim('topleft', 0.1, [0]);
        this.addAnim('topcenter', 0.1, [1]);
        this.addAnim('topright', 0.1, [3]);
        this.addAnim('middleleft', 0.1, [4]);
        this.addAnim('middlecenter', 0.1, [5]);
        this.addAnim('middleright', 0.1, [7]);
        this.addAnim('botleft', 0.1, [8]);
        this.addAnim('botcenter', 0.1, [9]);
        this.addAnim('botright', 0.1, [11]);
        this.addAnim('topleftdam', 0.1, [12]);
        this.addAnim('topcenterdam', 0.1, [13]);
        this.addAnim('toprightdam', 0.1, [15]);
        this.addAnim('middleleftdam', 0.1, [16]);
        this.addAnim('middlecenterdam', 0.1, [17]);
        this.addAnim('middlerightdam', 0.1, [19]);
        this.addAnim('botleftdam', 0.1, [20]);
        this.addAnim('botcenterdam', 0.1, [21]);
        this.addAnim('botrightdam', 0.1, [22]);

        this.buildingRow = settings.buildingRow;
        this.parent(x, y, settings);
        this.currentAnim = this.anims[settings.anim]
      },

      receiveDamage: function(amount, from) {
        this.buildingRow.receiveDamage(amount, this)
      },

      setAnim: function(val) {
        this.currentAnim = this.anims[val]
        this.initialAnim = val
      },

      update: function () {
        _.each(this.props, function(prop) {
          prop.pos = this.pos;
        }.bind(this))
        this.parent();
      },

      kill: function() {
        _.each(this.props, function(prop){
          prop.kill();
        })
        for (var i = 0; i < _.random(1,3); i++) {
          ig.game.spawnEntity(EntityDust, this.pos.x, this.pos.y, {})
        }
        this.parent();
      }
    });
  })