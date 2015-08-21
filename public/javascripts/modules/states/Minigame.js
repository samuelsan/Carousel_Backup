/* globals BootState, Phaser, FireFly */

'use strict';

var MinigameState = function (game) {

    this.game = game;
    this.arrayOfFlies = [];
    this.highscore = 0;
    this.score = 0; 
    this.timer1Stopped = true;
    this.game.stateTransition = null;

};    

MinigameState.prototype = {
  createFireFly: function()
  {
    var fly = new FireFly(this.game, this.game.world.randomX, this.game.world.randomY);
    fly.scale.setTo(0.25,0.25);
    this.game.add.existing(fly);
    this.arrayOfFlies.push(fly);
    fly.inputEnabled = true;
    fly.input.useHandCursor = true;
    fly.events.onInputDown.addOnce(this.destroySprite, this);
    return fly;
  },
  preload: function() {
    // load the images //
    this.game.load.atlasJSONHash('firefly-surprise', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.png', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.json');

    this.game.load.image('background',      '/javascripts/modules/units/backgrounds/Minigame-done.png');
    this.game.load.image('bugjar',          '/javascripts/modules/units/sprites/bugjar-done.png');
    this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
    this.game.load.image('firefly',         '/javascripts/modules/units/sprites/firefly1.png');
    // this.game.load.image('fireflysurprise', '/javascripts/modules/units/sprites/firefly-surprise.png');
    this.game.load.image('glow',            '/javascripts/modules/units/sprites/firefly-background1.png');
    this.game.load.image('arrow_right',            '/javascripts/modules/units/sprites/arrow_right.png');
    // load the sounds and music //
    this.game.load.audio('fireflybuzz',     '/javascripts/modules/units/sounds/firefly_buzzing.wav');
    this.game.load.audio('netswish',        '/javascripts/modules/units/sounds/net_swish.mp3');
    this.game.load.audio('firefly-catch',   '/javascripts/modules/units/sounds/firefly_surprise.mp3');
    this.game.load.audio('music',           '/javascripts/modules/units/music/Firefly.mp3');
  },
  create: function() {
    // initiate game physics //
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // add images//
    this.background = this.game.add.image(0,0, 'background');
    this.bugjar = this.game.add.image(10,15, 'bugjar');
    this.glow = this.game.add.image(0,0, 'glow');

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
    var ys = 32;

    for (var y = 0; y < 10; y++)
    {
        for (var x = 0; x < 20; x++)
        {
            var glow = this.game.make.sprite((x * xs * 6), (y * ys * 6), 'glow');

            glow.ox = glow.x;
            glow.oy = glow.y;

            glow.cx = this.game.rnd.between(0, this.xl);
            glow.cy = this.game.rnd.between(0, this.yl);

            glow.anchor.set(0.5);
            this.sprites.addChild(glow);
            this.glows.push(glow);
        }
    }

    // add audio
    this.netswish = this.game.add.audio('netswish');
    this.fireflycatch = this.game.add.audio('firefly-catch');

    this.music = this.game.add.audio('music');
    this.music.volume = 3;
    this.music.play();

    this.fireflybuzz = this.game.add.audio('fireflybuzz');
    this.fireflybuzz.volume = 2;
    this.fireflybuzz.loop = true;
    this.fireflybuzz.play();
 
    // Create a custom timer//
    this.timer = this.game.time.create();
      
    // Create a delayed event 1m and 30s from now//
    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
      
    // Start the timer//
    this.timer.start();

    for (var i=0; i < 6; i++) {
      this.createFireFly();
    }

    // PAUSE BUTTON //

    this.pause_label = this.game.add.text(20, 200, 'Pause', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    this.pause_label.events.onInputUp.add(function () {
      game.paused = true; 
    });    

    game.input.onDown.add(function () {
      game.paused = false;
    });
    
    // add bugnet sprite and set up bugnet physics//
    this.bugnet = this.game.add.sprite(400, 300, 'bugnet');
    this.bugnet.anchor.setTo(1,1);
    this.game.physics.enable(this.bugnet, Phaser.Physics.ARCADE);

    // rotates bugnet when clicked //
    var orig = this.bugnet.angle;
    var tween;
    
    this.game.input.activePointer.leftButton.onDown.add(function(e) //jshint ignore:line
    {
      tween = this.game.add.tween(this.bugnet).to({ angle: this.bugnet.angle + 179 }, 100, 'Sine.easeInOut', true, -1);
      this.netswish.play();
    }.bind(this), null, 0);
    
    this.game.input.activePointer.leftButton.onUp.add(function(e) //jshint ignore:line
    {
      this.tween.stop();
      this.game.add.tween(this.bugnet).to({ angle: orig }, 100, 'Sine.easeInOut', true, -1);
    }.bind(this), null, 0);

    // displays the score and sets a default of 0 // 
    this.score = 0;
    this.labelScore = this.game.add.text(48, 63, '0', { font: '30px Arial', fill: '#ffffff' });
  },
  update: function() {
    this.bugnet.fixedRotation = this.game.physics.arcade.moveToPointer(this.bugnet, 0, this.game.input.activePointer, 50);
    
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

    if (this.timer.running) {
      this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 480, 70, "white", "60px Arial");
    }
    else {
      this.game.world.removeAll();
      clearTimeout(this.fireflytimer);
      this.checkhighscore();
      this.game.input.activePointer.leftButton.onDown.removeAll();
      this.music.stop();
      this.fireflybuzz.stop();
      this.fireflycatch.stop();
      this.game.state.start('Minimenu', true, false);
    }  
  },
  destroySprite: function (firefly) {
    firefly.body.moves = false;
    firefly.loadTexture('firefly-surprise', 0);
    firefly.animations.add('firefly-surprise');
    firefly.animations.play('firefly-surprise', 10, false);

    this.fireflycatch.play();
    this.arrayOfFlies = this.arrayOfFlies.filter(function(fly)
    {
      return fly !== firefly;
    });
    setTimeout(function(){
      firefly.destroy();
    }.bind(this), 1500);
  
    if (this.timer.running)
    {
      setTimeout(function(){
        this.createFireFly();
      }.bind(this), 1500);
    }
    // updates the score
    this.updateScore();
  },
  updateScore: function () {
    // adds 1 to the score when bug is caught //
    this.score += 1;

    // changes the score text to the new score //
    if (this.labelScore) {
      this.labelScore.text = this.score;  
    }
  },  
  checkhighscore: function() {
    if (this.score > this.highscore){
        this.highscore = this.score;
        return this.highscore;
      } else {
        return this.highscore;
    }
  },
  checkscore: function() {
    return this.score;
  },
  render: function () {
    // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
    // if (this.timer.running) {
    //   this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 480, 70, "white", "60px Arial");
    // }
    // else {
    //   this.game.world.removeAll();
    //   clearTimeout(this.fireflytimer);
    //   this.checkhighscore();
    //   this.game.input.activePointer.leftButton.onDown.removeAll();
    //   this.music.stop();
    //   this.fireflybuzz.stop();
    //   this.fireflycatch.stop(); 
    //   this.game.state.start('Minimenu', true, true);
    // }
  },
  endTimer: function() {
    // Stop the timer when the delayed event triggers
    this.timer.stop();
  },
  formatTime: function(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var seconds = "0" + (s);
    return seconds.substr(-2);   
  },
  shutdown: function() {
    this.game.stateTransition = null;
  }
};