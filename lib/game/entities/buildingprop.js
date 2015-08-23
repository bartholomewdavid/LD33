ig.module(
  'game.entities.buildingprop'
  )
  .requires(
    'impact.entity',
    'game.plugins.underscore'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityBuildingprop = ig.Entity.extend({
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.NONE,
      gravityFactor: 0,
      zIndex: 50,
      name: 'Building Prop',
      initialAnim: '',

      // TODO SIZE NEEDS TO BE DETERMINED BY LAYERS
      size: { x: 32, y: 32 },

      // Load an animation sheet
      animSheet: new ig.AnimationSheet('media/props.png', 32, 32),

      init: function (x, y, settings) {
        this.addAnim('middleleft', 0.1, [0]);
        this.addAnim('middlecenter', 0.1, [1]);
        this.addAnim('middleright', 0.1, [3]);
        this.addAnim('botleft', 0.1, [4]);
        this.addAnim('botcenterleft', 0.1, [5]);
        this.addAnim('botcenterright', 0.1, [6]);
        this.addAnim('botright', 0.1, [7]);

        this.addAnim('middleleftdam', 0.1, [8]);
        this.addAnim('middlecenterdam', 0.1, [9]);
        this.addAnim('middlerightdam', 0.1, [11]);
        this.addAnim('botleftdam', 0.1, [12]);
        this.addAnim('botcenterleftdam', 0.1, [13]);
        this.addAnim('botcenterrightdam', 0.1, [14]);
        this.addAnim('botrightdam', 0.1, [15]);

        this.parent(x, y, settings);

        this.currentAnim = this.anims[settings.anim]
      },

      setAnim: function(val) {
        this.currentAnim = this.anims[val]
        this.initialAnim = val
      },

      update: function () {
        this.parent();
      }
    });
  })