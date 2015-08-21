/* globals BootState, Phaser */

'use strict';

var StreamState = function (game) 
{
  this.init = function(){ 
    this.game = game;
    this.iris = null;
    this.points = {
    'x': [985, 770, 840],
    'y': [650, -320, 700]
    };
    this.timer1Stopped = true;

    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition); 
    // This passes now!
    // The function referred to by: game.state.start('MinigameState');
    // should have an init function that is passed a context (this) with a preconfigured game
    // object. That object has a plugins property (this.game.plugins), which can be added to
    // (ie. is not null)

    this.game.stateTransition.configure({
      duration: Phaser.Timer.SECOND * 3,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0,
        scale: {
          x: 1.4,
          y: 1.4
        }
      }
    });       
  };  
};

StreamState.prototype = 
{
  preload: function() 
  {
    this.game.load.image('background',         '/javascripts/modules/units/backgrounds/stream.jpg');
    this.game.load.image('fish',               '/javascripts/modules/units/sprites/fish.png');
    this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right1.png', '/javascripts/modules/units/sprites/Walking/walk-right1.json');
    this.game.load.image('stand',              '/javascripts/modules/units/sprites/iris-stand.png');
    this.game.load.image('arrow_right',        '/javascripts/modules/units/sprites/arrow_right.png');
    this.game.load.image('arrow_left',         '/javascripts/modules/units/sprites/arrow_left.png');
    this.game.load.audio('streammusic',        '/javascripts/modules/units/sounds/mountain_stream_loop.mp3');
    this.game.load.image('glow',               '/javascripts/modules/units/sprites/firefly-background1.png');
    this.game.load.audio('fishjump',           '/javascripts/modules/units/sounds/fish_jump1.wav');
    this.game.load.audio('walksound',           '/javascripts/modules/units/sounds/Walking.mp3');

    this.game.load.image('acorninventory',  '/javascripts/modules/units/sprites/acorninventory.png');
    this.game.load.image('bugnetinventory', '/javascripts/modules/units/sprites/bugnetinventory.png');
    this.game.load.image('keyinventory', '/javascripts/modules/units/sprites/keyinventory.png');

    this.game.load.image('story13',   '/javascripts/modules/units/story/story13.png');
    this.game.load.image('story14',   '/javascripts/modules/units/story/story14.png');
    this.game.load.image('story15',   '/javascripts/modules/units/story/story15.png');

  },
  create: function()
  {
    this.background = this.game.add.image(0,0, 'background');
    this.background.height = this.game.height;
    this.background.width = this.game.width;

    this.iris = game.add.sprite(-150, 300, 'walk-right');
    this.iris.animations.add('walk-right');
    this.iris.animations.play('walk-right', 3, true);
    this.game.add.sprite('stand');

    this.streammusic = this.game.add.audio('streammusic');
    this.streammusic.volume = 0.5;
    this.streammusic.loop=true;
    this.streammusic.play();

    this.walksound = this.game.add.audio('walksound');
    this.walksound.volume = 0.5;
    this.walksound.play();

    this.fishjump = this.game.add.audio('fishjump');
    this.fishjump.volume = 2;

    this.storyteller();

    if (window.oaktree.maintainAcorns() > 0){
      this.acorninventory = this.game.add.image(20, 30, 'acorninventory');
      this.hasAcorn = window.oaktree.maintainAcorns();
      this.acorncount = this.game.add.text(40, 45, this.hasAcorn, { font: '20px Arial', fill: '#ffffff' });
    }

    if (window.oaktree.maintainBugnet() === true){
      this.bugnetinventory = this.game.add.image(80, 30, 'bugnetinventory');
    }

    if (window.oaktree.maintainKeys() === true){
      this.keyinventory = this.game.add.image(140, 30, 'keyinventory');
    }

    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.useBugnet, this);
    //bug glow

    this.sprite = { x: 0, y: -64 };
    this.tween = this.game.add.tween(this.sprite).to( { x: 128 }, 4000, "Bounce.easeIn", true, 0, -1, true);
    this.tween2 = this.game.add.tween(this.sprite).to( { y: 128 }, 4000, "Bounce.easeOut", true, 0, -1, false);
    this.glows = [];
    this.waveformX = this.tween.generateData(70);
    this.waveformY = this.tween2.generateData(70);

    this.xl = this.waveformX.length - 1;
    this.yl = this.waveformY.length - 1;

    this.sprites = this.game.add.spriteBatch();

    var xs = 28;
    var ys = 7;

    for (var y = 0; y < 10; y++)
    {
      for (var x = 0; x < 20; x++)
      {
        var glow = this.game.make.sprite((x * xs * 8), (y * ys * 9), 'glow');

        glow.ox = glow.x;
        glow.oy = glow.y;

        glow.cx = this.game.rnd.between(0, this.xl);
        glow.cy = this.game.rnd.between(0, this.yl);

        glow.anchor.set(0.5);
        this.sprites.addChild(glow);
        this.glows.push(glow);
      }
    }

    var recClick = new Phaser.Rectangle(700, 500, 250, 250);

    var handlePointerDown = function(pointer)
    {
      // console.log(pointer.x, pointer.y);
      var inside = recClick.contains(pointer.x,pointer.y);
      if(inside)
      {
        if(!this.timer1Stopped)
        {
          return;
        }
        //   this.fishJump();
        // }
        // console.log('click');

        this.increment = 10 / this.game.width;  
        this.i = 0;
        this.timer1Stopped = true;
        this.timer1 = null;

        // create the fish sprite
        // follow the motion path by using the plot function 
        this.fishSprite = this.game.add.sprite(0, 0, "fish");
        this.fishSprite.anchor.setTo(0.5, 0.5);


    // this.bmd = this.add.bitmapData(this.game.width, this.game.height);
    // this.bmd.addToWorld();
    // // Draw the path
    // for (var j = 0; j < 1; j += this.increment) {
    //   var posx = this.math.bezierInterpolation(this.points.x, j);
    //   var posy = this.math.bezierInterpolation(this.points.y, j);
    //   this.bmd.rect(posx, posy, 3, 3, 'rgba(245, 0, 0, 1)');
    // }

        if (this.timer1Stopped)
        {
          this.timer1Stopped = false;
          this.timer1 = this.game.time.create(true);
          this.timer1.loop(0.01, this.plot, this);
          this.timer1.start();
        }
      }
      else
      {
        console.log('outside');
      }
    };

    this.game.input.onDown.add(handlePointerDown, this);

    // this.game.physics.startSystem(Phaser.Physics.BOX2D);
    // this.game.physics.box2d.restitution = 0.3;
    // this.game.physics.box2d.gravity.y = 500;
    // this.game.physics.box2d.setBoundsToWorld();

    var tween = this.game.add.tween(this.iris).to({x: 500}, 5000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
      this.walksound.stop();
      this.iris.loadTexture('stand', 0);
    }, this);
    
    // this.arrow_right = this.game.add.image(game.width - 100, game.height/2 - 100, 'arrow_right');
    // this.arrow_right.inputEnabled = true;
    // this.arrow_right.events.onInputDown.add(function () {
    // game.state.start('Minimenu', true, true);
    // });

    // this.arrow_left = this.game.add.image(game.width - game.width + 2, game.height/2 - 100, 'arrow_left');
    // this.arrow_left.inputEnabled = true;
    // this.arrow_left.events.onInputDown.add(function () {
    // game.stateTransition.to('Oaktree', true, true);
    // });     
  },
  // fishJump: function () {
  //   var fish = new Fish(this.game, this.launchX, this.launchY);
  //   this.game.add.existing(fish);
  // },

  plot: function()
  { 
    var posx = this.math.bezierInterpolation(this.points.x, this.i);
    var posy = this.math.bezierInterpolation(this.points.y, this.i);
    this.fishSprite.x = posx;
    this.fishSprite.y = posy;
    this.i += this.increment;
    if (posy > 700)
    {
      this.timer1.stop();
      this.timer1.destroy();
      this.i = 0;
      this.timer1Stopped = true;
      this.fishjump.play();
      this.fishSprite.destroy();
    }
  },

  update: function() 
  {    
    for (var i = 0, len = this.glows.length; i < len; i++)
    {
        this.glows[i].x = this.glows[i].ox + this.waveformX[this.glows[i].cx].x;
        this.glows[i].y = this.glows[i].oy + this.waveformY[this.glows[i].cy].y;

        this.glows[i].cx++;

        if (this.glows[i].cx > this.xl)
        {
            this.glows[i].cx = 0;
        }

        this.glows[i].cy++;

        if (this.glows[i].cy > this.yl)
        {
            this.glows[i].cy = 0;
        }
    }  
  },

  storyteller: function() {
    setTimeout(function(){
      this.panel13 = this.game.add.image(200, 350, 'story13');
      this.panel13.inputEnabled = true;
      this.panel13.events.onInputDown.add(this.storyteller2, this);
    }.bind(this), 2000);
  },

  storyteller2: function() {
    this.panel13.destroy();
    this.panel14 = this.game.add.image(200, 350, 'story14');
    this.panel14.inputEnabled = true;
    this.panel14.events.onInputDown.add(this.storyteller3, this);
  },

  storyteller3: function() {
    this.panel14.destroy();
    this.panel15 = this.game.add.image(200, 350, 'story15');
    this.panel15.inputEnabled = true;
    this.panel15.events.onInputDown.add(this.storyteller4, this);
    this.storydone2 = true;
  },

  storyteller4: function() {
    this.panel15.destroy();
  },

  useBugnet: function() {
    if (this.storydone2 === true){
      game.state.start('Minimenu', true, true);
    } else {
      false
    }
  },

  shutdown: function() {
    this.game.stateTransition = null;
  }
};


