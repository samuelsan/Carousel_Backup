// (function(){
//   "use strict";

//   var Inventory = window.Inventory = function(game)
//   {
//     Phaser.Group.call(this, game, null, 'inventory');
//     // console.log('Created new Inventory', this);
//     this.game = game;

//     // this.game.add.image(10, 10, 'inventory-background', 0, this);

//     this.game.state.onStateChange.add(function(state)
//     {
//       if(state === 'Oaktree')
//       {
//         this.add(new Phaser.Image(this.game, 0, 0, 'inventory-background', 0));    
//       }
//     }, this);

    

//     this.inventory = {
//       hasAcorns: 0,
//       hasBugnet: false,
//       hasKey: false,
//       hasBugjar: true
//     };

//     this.x = 10;
//     this.y = 10;
//     this.width = 250;
//     this.height = 50;
//   };

//   Inventory.prototype = Object.create(Phaser.Group.prototype);
//   Inventory.prototype.constructor = Inventory;

//   Inventory.prototype.add_item = function(item)
//   {
//     switch(item)
//     {

//     }
//   };

//   Inventory.prototype.create = function()
//   {
//     this.key1 = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.ONE);
//     this.key2 = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.TWO);
//     this.key3 = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.THREE);
//     this.key4 = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.FOUR);
//     this.key5 = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.FIVE);
//   };

//   Inventory.prototype.preload = function()
//   {
//     console.log('Preloading');
//     // this.game.load.image('inventory-background', )
//   };

//   Inventory.prototype.update = function

//   Inventory.prototype.render = function render()
//   {

//   };

// }());
