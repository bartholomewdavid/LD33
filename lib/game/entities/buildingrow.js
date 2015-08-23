ig.module(
  'game.entities.buildingrow'
  )
  .requires(
    'impact.entity',
    'impact.game',
    'game.plugins.underscore',
    'game.entities.buildingblock',
    'game.entities.buildingprop'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityBuildingrow = ig.Entity.extend({
      collides: ig.Entity.COLLIDES.ACTIVE,
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      gravityFactor: 2,
      name: 'Building Row',
      initialAnim: '',
      blocks: [],
      health: 2,
      building: null,

      init: function (x, y, settings) {
        this.size = {x: 32*settings.width, y: 32}
        this.building = settings.building
        for(var i = 0; i < settings.width; i++) {
          var pos = {x: this.pos.x + (i*32), y: this.pos.y}
          var bb = ig.game.spawnEntity(EntityBuildingblock, pos.x, pos.y, {buildingRow: this});
          var bp = ig.game.spawnEntity(EntityBuildingprop, pos.x, pos.y, {});
          var idx = this.blocks.push(bb);
          var prefix = settings.prefix;
          var suffix = 'center';
          if (i == 0) {
            suffix = 'left';
          } else if (i == this.layerWidth - 1) {
            suffix = 'right'
          }
          var pSuffix = 'left';
          if (prefix == 'bot') {
            var centerTwo = []
            if (this.layerWidth % 2 != 0) {
              //Odd
              centerTwo.push(Math.ceil(this.layerWidth / 2))
              centerTwo.push(Math.floor(this.layerWidth / 2))
            } else {
              //Even
              centerTwo.push(this.layerWidth / 2)
              centerTwo.push((this.layerWidth / 2) - 1)
            }
            if (i == centerTwo[0]) {
              pSuffix = 'centerright';
            }
            if (i == centerTwo[1]) {
              pSuffix = 'centerleft';
            }
            if (i == this.layerWidth - 1) {
              pSuffix = 'right'
            }
          }
          bb.setAnim(prefix + suffix)
          bp.setAnim(prefix + pSuffix)
          bb.props.push(bp)
        }
        this.parent(x, y, settings)
      },

      receiveDamage: function(amount, from) {
        // Damage blocks
        this.health -= amount
        if (this.health < 2) {
          _.each(this.blocks, function(block) {
            block.currentAnim = block.anims[block.initialAnim+'dam'];
            _.each(block.props, function(prop) {
              prop.currentAnim = prop.anims[prop.initialAnim+'dam'];
            })
          }.bind(this))
        }
        if (this.health <= 0) {
          this.kill()
        }
      },

      update: function () {
        _.each(this.blocks, function(block, idx) {
          block.pos = {x: this.pos.x + (idx*32), y: this.pos.y};
        }.bind(this))
        this.parent();
      },

      collideWith: function(other, axis) {
        if (this.falling) {
          if (other.pos.y > this.pos.y) {
            this.receiveDamage(1)
            this.falling = false
            other.receiveDamage(1)
          }
        }
      },

      kill: function() {
        _.each(this.blocks, function(block){
          block.kill();
        })
        this.building.killRow(this)
        this.parent();
      }
    });
  })