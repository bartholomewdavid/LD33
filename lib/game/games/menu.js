ig.module('game.games.menu')
  .requires(
    'impact.game',
    'impact.font',
    'game.games.play'
    )
  .defines(function () {
    MenuGame = ig.Game.extend({
      font: new ig.Font('media/04b03.font.png'),
      init: function () {
        ig.input.bind(ig.KEY.X, 'start')
      },

      update: function () {
        if (ig.input.pressed('start')) {
          ig.system.setGame(PlayGame);
        }
        this.parent();
      },

      draw: function () {
        this.parent();
        this.font.draw('DINO RAMPAGE', ig.system.width / 2, ig.system.height / 2, ig.Font.ALIGN.CENTER)
        this.font.draw('Press X to start the game.', ig.system.width / 2, ig.system.height / 2 + 140, ig.Font.ALIGN.CENTER)
      }
    });
  });