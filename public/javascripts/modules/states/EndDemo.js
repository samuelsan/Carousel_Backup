/* globals Phaser */
'use strict';

  var EndDemoState = function (game) {
    this.game = game;

    this.lineArray = [
    "Thank you for playing the Carousel demo!",
    "Please vote for us if you enjoyed it! :)",
    ];
    this.index = -1;
    this.line = '';
  };



  EndDemoState.prototype = {
    preload: function() {
      this.game.load.image('background',   '/javascripts/modules/units/backgrounds/stream.jpg');
      this.game.load.audio('compass-song', '/javascripts/modules/units/music/IntroSong.mp3');
      this.game.load.image('glow',         '/javascripts/modules/units/sprites/firefly-background1.png');
      this.game.load.image('chest',         '/javascripts/modules/units/sprites/secretchest.png');
    },

    create: function() {
      this.background = this.game.add.image(0,0, 'background');
      this.background.height = this.game.height;
      this.background.width = this.game.width;

      this.compasssong = this.game.add.audio('compass-song', 2, true);
      this.compasssong.loop = true;
      this.compasssong.play();

      this.text = this.game.add.text(50, 350, '', { font: "30pt Courier", fill: "white", stroke: "white", textAlign: "center", strokeThickness: 2 });
      this.nextLine();

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
      };
    },
    updateLine: function()  {
      if (this.line.length < this.lineArray[this.index].length) {
        this.line = this.lineArray[this.index].substr(0, this.line.length + 1);
        this.text.setText(this.line);
      } else {
        //  Wait 2 seconds then start a new line
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
      }
    },
    nextLine: function() {
      this.index++;

      if (this.index < this.lineArray.length) {
        this.line = '';
        this.game.time.events.repeat(80, this.lineArray[this.index].length + 1, this.updateLine, this);
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

    revealchest: function()
    {
      this.chest = this.game.add.image(140, 30, 'chest');
      this.chest.inputEnabled = true;
      this.chest.events.onInputDown.add(this.unlock, this)
    },

    unlock: function()
    {
      this.slingshot = this.game.add.image(140, 30, 'slingshot');
      this.lineArray = [
        "You got the slingshot! Lucky!",
        "Now Iris can shoot acorns faster and with better accuracy to injure or stun enemies!",
        "It's not useable yet, but it's going to be pretty handy in the main game!",
      ]
    }
  };