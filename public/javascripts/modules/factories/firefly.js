(function()
{
  "use strict";
  var FireFly = window.FireFly =  function (game, x, y) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, 'firefly');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    game.physics.arcade.velocityFromRotation(game.rnd.angle(), 500, this.body.velocity);
  };

  /**
  * FireFly instance creation.
  */
  FireFly.prototype = Object.create(Phaser.Sprite.prototype);
  FireFly.prototype.constructor = FireFly;
  FireFly.prototype.update = function()
  {
    if(Math.ceil(Math.random() * 100) < 25)
    {
      this.game.physics.arcade.velocityFromRotation(this.angle + this.game.rnd.integerInRange(-60, 60), 500, this.body.velocity);
    }
  };
}()
);