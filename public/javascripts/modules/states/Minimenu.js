/* globals BootState, Phaser */

'use strict';

var MinimenuState = function (game) {
  this.game = game;
};

MinimenuState.prototype = {
  preload: function() {
    //Mini Menu Assets //
      this.game.load.image('background',    '/javascripts/modules/units/backgrounds/Minigame-done.png');
      this.game.load.image('menu',          '/javascripts/modules/units/backgrounds/minigamemenu.png');
      this.game.load.image('playbutton',    '/javascripts/modules/units/sprites/fireflyplay.png');
      this.game.load.image('returnbutton',  '/javascripts/modules/units/sprites/fireflyquit.png');

      //Mini Menu Audio //
      this.game.load.audio('music',         '/javascripts/modules/units/music/Firefly.mp3');
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
    this.menu = this.game.add.image(250,0, 'menu');
    this.playbutton = this.game.add.button(690, 235, 'playbutton', this.playgame);
    this.returnbutton = this.game.add.button(290, 235, 'returnbutton', this.gotostory);

    this.highscore = this.game.add.text(538, 400, window.minigame.checkhighscore(), { font: '30px Arial', fill: '#ffffff'});
    this.score = this.game.add.text(538, 325, window.minigame.checkscore(), { font: '30px Arial', fill: '#ffffff'});

    if (!this.music || !this.music.isPlaying) {
      this.music = this.game.add.audio('music', 3, true);
      this.music.play();
    }
  },
  playgame: function() { 
   this.game.state.start('Minigame', true, true);
   this.game.stateTransition = null;
  },
  gotostory: function() {
    this.game.state.start('EndDemo', true, true);
    this.game.stateTransition = null;
  },
  // update: function() {}
  shutdown: function() {
    this.game.stateTransition = null;
  }  
};