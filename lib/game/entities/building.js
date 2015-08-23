ig.module(
  'game.entities.building'
  )
  .requires(
    'impact.entity',
    'impact.game',
    'game.plugins.underscore',
    'game.entities.buildingrow'
    )
  .defines(function () {
    // Create your own entity, subclassed from ig.Enitity
    EntityBuilding = ig.Entity.extend({
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.NONE,
      layers: 3,
      layerWidth: 5,
      gravityFactor: 1,
      name: 'Building',
      _layers: [],
      _healths: [],

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.size = { x: this.layerWidth * 32, y: this.layers * 32 };

        if (!ig.global.wm) {
          this._generateRows()
        } else {
          this._wmDrawBox = true
          this._wmBoxColor = 'red'
        }
      },

      receiveDamage: function (amount, ent) {
        var hitRow = _.findIndex(this._layers, function (row) {
          return _.find(row, function (item) {
            return item == ent;
          })
        });
        this._healths[hitRow]--;
        if (this._healths[hitRow] < 3) {
          _.each(this._layers[hitRow], function(ent) {
            ent.currentAnim = ent.anims[ent.initialAnim+'dam'];
            _.each(ent.props, function(prop) {
              prop.currentAnim = prop.anims[prop.initialAnim+'dam'];
            })
          })
        }
        if (this._healths[hitRow] == 0) {
          _.each(this._layers[hitRow], function (ent) {
            ent.kill();
          });
        }
      },

      _generateRows: function () {
        for (var layer = 0; layer < this.layers; layer++) {
          var prefix = 'middle';
          if (layer == 0) {
            prefix = 'top';
          } else if (layer == this.layers - 1) {
            prefix = 'bot';
          }
          var br = ig.game.spawnEntity(EntityBuildingrow, this.pos.x, this.pos.y + (32*layer), {width: this.layerWidth, prefix: prefix, building: this});
          this._layers.push(br)
        }
      },

      update: function () {
        this.parent();
      },

      killRow: function(row) {
        var idx = this._layers.indexOf(row)
        var brs = [this._layers[idx-1]]
        this._layers.splice(idx, 1)
        _.each(brs, function(br) {
          if (br !== undefined) {
            br.falling = true
          }
        })
      }
    });
  })