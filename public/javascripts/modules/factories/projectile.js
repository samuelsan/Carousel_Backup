(function()
{
    "use strict";

    var Projectile = window.Projectile =  function (game, x, y, no_throw)
    {
        Phaser.Sprite.call(this, game, x, y, 'acorn');
        
        this.game = game;
        this.game.physics.box2d.enable(this);
        
        var v = this.getLaunchVelocity();

        // console.log(v);

        // this.body.sensor = true;
        if(!no_throw)
        {
            this.body.velocity.x = v.x;
            this.body.velocity.y = v.y;
        }
        this.game.add.existing(this);

        // this.body.onBeginContact.add(function()
        // {
        //     console.log("OnBegiarguments);
        // })

        // console.log(this);
    };

    /**
      * Projectile instance creation.
    */
    Projectile.prototype = Object.create(Phaser.Sprite.prototype);
    Projectile.prototype.constructor = Projectile;

    Projectile.prototype.getLaunchVelocity = function() 
    {
        var dx = this.game.input.mousePointer.x - this.x;
        var dy = this.game.input.mousePointer.y - this.y;
        
        // Give it some more beans
        dx *= 2;
        dy *= 2;
        
        return { x: dx, y: dy };    
    }

  
    // Returns the location the projectile will be at time step n after launch
    // Projectile.prototype.getTrajectoryPoint = function(startX, startY, velocityX, velocityY, n) {
    //   //velocity and gravity are given per second but we want time step values here
    //   var t = 1 / 60.0; // seconds per time step (at 60fps)
      
    //   var stepVelocityX = t * this.tgame.physics.box2d.pxm( -this.velocityX ); // m/s
    //   var stepVelocityY = t * this.game.physics.box2d.pxm( -this.velocityY );
      
    //   var stepGravityX = t * t * this.game.physics.box2d.pxm( -this,game.physics.box2d.gravity.x ); // m/s/s
    //   var stepGravityY = t * t * this.game.physics.box2d.pxm( -this.game.physics.box2d.gravity.y );
  
    //   this.startX = this,game.physics.box2d.pxm(-this.startX);
    //   this.startY = this.game.physics.box2d.pxm(-this.startY);
      
    //   var tpx = this.startX + n * stepVelocityX + 0.5 * (n*n+n) * stepGravityX;
    //   var tpy = this.startY + n * stepVelocityY + 0.5 * (n*n+n) * stepGravityY;
      
    //   tpx = this.game.physics.box2d.mpx(-tpx);
    //   tpy = this.game.physics.box2d.mpx(-tpy);
    // };

    // Projectile.prototype.postUpdate = function()
    // {
    //     // console.log('PostUpdate', this);
    // }
  
    Projectile.prototype.render = function()
    {
        this.game.debug.box2dWorld();
    //   var launchVelocity = getLaunchVelocity();
    //   game.debug.start();
    //   var lastPos = null;    
    //   for (var i = 0; i < 180; i += 6)
    //   {
    //       var trajectoryPoint = getTrajectoryPoint(launchX, launchY, launchVelocity.x, launchVelocity.y, i);
    //       if (lastPos && i % 12 == 0)
    //       {
    //         line(lastPos.x, lastPos.y, trajectoryPoint.x, trajectoryPoint.y);
    //       }
    //       lastPos = trajectoryPoint;
    //   };
    //   game.debug.stop();    
    };
}());  