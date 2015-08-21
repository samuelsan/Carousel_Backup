  var BootState = function BootState(game)
  {
    this.game = game;
    console.log("%s ctor", this.constructor.name);
  };

  BootState.prototype =
  {
    constructor: BootState,
    preload: function() {
      console.log(this.constructor.name, "preload");
    },
    create: function() {
      console.log(this.constructor.name, "create");
      game.state.onStateChange.add(function(e) {
        console.log('State Changed', e);
      },this);
      this.game.state.start('Preload')
    },
    // update: function() {
    //   console.log(this.constructor.name, "update");
    // }
  };