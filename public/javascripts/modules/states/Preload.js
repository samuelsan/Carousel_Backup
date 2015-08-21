  var PreloadState = function PreloadState(game)
  {
    this.game = game;
    console.log("%s ctor", this.constructor.name);
  };

  PreloadState.prototype =
  {
    preload: function()
    {
      //Assets for Main Menu//
      game.load.image('background', '/javascripts/modules/units/backgrounds/carousellogo1.jpg');
      game.load.image('title', '/javascripts/modules/units/backgrounds/carousellogo1.png');
      game.load.audio('compass-song', '/javascripts/modules/units/music/IntroSong.mp3');

      //Mini Menu Assets //
      this.game.load.image('background',    '/javascripts/modules/units/backgrounds/minigamebackground-alt.jpg');
      this.game.load.image('menu',          '/javascripts/modules/units/backgrounds/minigame-intro.png');
      this.game.load.image('playbutton',    '/javascripts/modules/units/sprites/playbutton.png');
      this.game.load.image('returnbutton',  '/javascripts/modules/units/sprites/returnbutton.png');

      //Stream Assets//
      this.game.load.image('background', '/javascripts/modules/units/backgrounds/stream.jpg')

      //Mini Menu Audio //
      this.game.load.audio('music',         '/javascripts/modules/units/music/Firefly.mp3');

      //Assets for MiniGame //
      this.game.load.atlasJSONHash('firefly-surprise', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.png', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.json');

      this.game.load.image('background',      '/javascripts/modules/units/backgrounds/minigamebackground-alt.jpg');
      this.game.load.image('bugjar',          '/javascripts/modules/units/sprites/bugjar1.png');
      this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
      this.game.load.image('firefly',         '/javascripts/modules/units/sprites/firefly1.png');
      // this.game.load.image('fireflysurprise', '/javascripts/modules/units/sprites/firefly-surprise.png');
      this.game.load.image('glow',            '/javascripts/modules/units/sprites/firefly-background.png');

      // Minigame Audio //
      this.game.load.audio('fireflybuzz',     '/javascripts/modules/units/sounds/firefly_buzzing.wav');
      this.game.load.audio('netswish',        '/javascripts/modules/units/sounds/net_swish.mp3');
      this.game.load.audio('firefly-catch',   '/javascripts/modules/units/sounds/firefly_surprise.mp3');
      this.game.load.audio('music',           '/javascripts/modules/units/music/Firefly.mp3');
    },
    create: function()
    {
      this.game.state.start('MainMenu');
    }
  };