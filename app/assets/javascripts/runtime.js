requirejs.config({
  paths: {
    Phaser: 'app/assets/javascripts/phaser'
  }
});

require([
  'app/assets/javascripts/modules/CarouselGame',
  'app/assets/javascripts/modules/states/Boot',
  'app/assets/javascripts/modules/states/Preload',
  'app/assets/javascripts/modules/states/Oaktree',
  'app/assets/javascripts/modules/states/Stream',
  'app/assets/javascripts/modules/states/Minimenu',
  'app/assets/javascripts/modules/states/Minigame',
  'app/assets/javascripts/modules/states/EndDemo'],
  function (CarouselGame, BootState, PreloadState, OaktreeState, StreamState, MinimenuState, MinigameState, EndDemoState) {

  var game = new PhaserGame(640, 480);
  game.state.add('Boot', BootState);
  game.state.add('Preload', PreloadState);
  game.state.add('Oaktree', OaktreeState);
  game.state.add('Stream', StreamState);
  game.state.add('Minimenu', MinimenuState);
  game.state.add('Minigame', MinigameState);
  game.state.add('EndDemo', EndDemoState);
  game.state.start('Boot');
});