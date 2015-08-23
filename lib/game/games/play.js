ig.module(
  'game.games.play'
  )
  .requires(
    'impact.game',
    'impact.font',
    'game.levels.main'
    )
  .defines(function () {
    PlayGame = ig.Game.extend({
      font: new ig.Font('media/04b03.font.png'),
      lizard: null,
      sinX: 0,

      init: function () {
        this.loadLevel(LevelMain)
        this.gravity = 64
        ig.input.bind(ig.KEY.R, 'restart');
        lizard = ig.game.getEntityByName('Lizard')
        ig.Sound.enabled = false;
      },

      shake: function (major) {
        var amount = (major) ? 10 : 5
        this.sinX = amount;
      },

      update: function () {
        var shakeOffset = 0
        if (this.sinX > 0) {
          shakeOffset = Math.sin(this.sinX) * 5
          this.sinX -= .5
        }

        if (ig.input.pressed('restart')) {
          ig.system.setGame(MenuGame);
        }

        ig.game.screen.x = lizard.pos.x - 320 + 64 + shakeOffset
        ig.game.screen.y = lizard.pos.y - 160

        this.parent()
      },

      draw: function() {
        this.parent()

        this.font.draw( 'X - Lizard Punch', 16, 32, ig.Font.ALIGN.LEFT );
        this.font.draw( 'C - Lizard Kick', 16, 48, ig.Font.ALIGN.LEFT );
        this.font.draw( 'R - to Restart', 16, 16, ig.Font.ALIGN.LEFT );
      }
    });
  });