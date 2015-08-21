/* globals BootState, Phaser, Projectile */

'use strict';

var OaktreeState = function (game) 
{
  this.init = function(){ 
    this.game = game;
    BootState.call(this, game);

    this.storydone1 = false;

    this.acorn = null;
    this.key = null;
    this.bugnet = null;
    this.squirrelhole = null;
    this.iris = null;
    this.irisclicked = false;
    this.arrayOfAcorns = [];

    this.hasAcorn = 0;
    this.hasBugnet = false;
    this.hasKey = false;

    this.key1 = null;
    this.key2 = null;
    this.key3 = null;
    this.key4 = null;
    this.key5 = null;

    var acorn = null;

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

var ground = [[1,796.5,929,558.5,1067,564,1067,800],[367,583.5,469,575.5,599,600.5,329,599.5,348.5,586],[824,582.5,735,606.5,780,586.5],[599,600.5,469,575.5,545,579.5,573,585.5],[61,621.5,1,796.5,10,632.5,17,624.5],[1067,564,1020,561.5,1052,559.5],[929,558.5,824,582.5,882,562.5],[329,599.5,1,796.5,259,603.5,285,597.5],[209,607.5,1,796.5,179,610.5,187,607.5],[677,611.5,1,796.5,631,606.5,667,607.5],[259,603.5,1,796.5,209,607.5,221,603.5],[469,575.5,367,583.5,391,575.5],[179,610.5,1,796.5,87,615.5,99,609.5],[10,632.5,1,796.5,0.5,636],[87,615.5,1,796.5,61,621.5],[599,600.5,631,606.5,1,796.5,329,599.5],[929,558.5,735,606.5,824,582.5],[703,610.5,1,796.5,677,611.5],[735,606.5,1,796.5,703,610.5]];

OaktreeState.prototype = {
  createAcorn: function(no_throw)
  {
    // var acorn = new Projectile(this.game, 700 + Math.random() * 300, )
    var acorn = new Projectile(this.game, this.world.randomX, 350 + Math.random() * 200, no_throw);
    this.game.add.existing(acorn);
    acorn.inputEnabled = true;
    acorn.input.useHandCursor = true;
    acorn.events.onInputDown.add(this.pickupAcorn, this);
    this.arrayOfAcorns.push(acorn);
    this.arrayOfAcorns.collidesWith = [this.bugnet, this.squirrelhole];
    return acorn;
  },

  preload: function(){
    this.game.load.atlasJSONHash('iris-throwing', '/javascripts/modules/units/sprites/Throwing/iris-throwing.png', '/javascripts/modules/units/sprites/Throwing/iris-throwing.json');

      this.game.load.atlasJSONHash('iris-swing', '/javascripts/modules/units/sprites/iris-tire.png', 
      '/javascripts/modules/units/sprites/iris-tire.json');

      this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right1.png', 
      '/javascripts/modules/units/sprites/Walking/walk-right1.json');

      this.game.load.atlasJSONHash('walk-left', '/javascripts/modules/units/sprites/Walking/walk-left.png', 
      '/javascripts/modules/units/sprites/Walking/walk-left.json');

      this.game.load.image('background-1',      '/javascripts/modules/units/backgrounds/Oaktree-start.jpg');
      this.game.load.image('background-2',    '/javascripts/modules/units/backgrounds/Oaktree-normal.jpg');
      this.game.load.image('ground',          '/javascripts/modules/units/backgrounds/oakground.png');

      this.game.load.image('squirrelhole',    '/javascripts/modules/units/backgrounds/squirrelhole.png');

      this.game.load.image('branch',          '/javascripts/modules/units/backgrounds/branch.png');

      this.game.load.image('acorn',           '/javascripts/modules/units/sprites/acorn1.png');
      this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
      this.game.load.image('key2',             '/javascripts/modules/units/sprites/key1.png');

      this.game.load.image('acorninventory',  '/javascripts/modules/units/sprites/acorninventory.png');
      this.game.load.image('bugnetinventory', '/javascripts/modules/units/sprites/bugnetinventory.png');
      this.game.load.image('keyinventory', '/javascripts/modules/units/sprites/keyinventory.png');

      this.game.load.image('iris-throw-static', '/javascripts/modules/units/sprites/iris-throw.png');

      this.game.load.image('iris-throw-left',   '/javascripts/modules/units/sprites/iristhrowleft.png');
      this.game.load.image('iris-stand',      '/javascripts/modules/units/sprites/iris-stand.png');
      this.game.load.image('iris-pickup',     '/javascripts/modules/units/sprites/pickup1.png');
      this.game.load.image('iris-start',      '/javascripts/modules/units/sprites/iris-swing1.png');
      this.game.load.image('arrow_right',     '/javascripts/modules/units/sprites/arrow_right.png');

      //Oaktree Story//
      this.game.load.image('story1',   '/javascripts/modules/units/story/story1.png');
      this.game.load.image('story2',   '/javascripts/modules/units/story/story2.png');
      this.game.load.image('story3',   '/javascripts/modules/units/story/story3.png');
      this.game.load.image('story4',   '/javascripts/modules/units/story/story4.png');
      this.game.load.image('story5',   '/javascripts/modules/units/story/story5.png');
      this.game.load.image('story6',   '/javascripts/modules/units/story/story6.png');
      this.game.load.image('story7',   '/javascripts/modules/units/story/story7.png');
      this.game.load.image('story8',   '/javascripts/modules/units/story/story8.png');
      this.game.load.image('story9',   '/javascripts/modules/units/story/story9.png');
      this.game.load.image('story11',   '/javascripts/modules/units/story/story11.png');
      this.game.load.image('story12',   '/javascripts/modules/units/story/story12.png');
      this.game.load.image('dontneed',   '/javascripts/modules/units/story/dontneed.png');

      // Oaktree Audio //
      this.game.load.audio('background-music', '/javascripts/modules/units/music/oaktreemusic.mp3');
      this.game.load.audio('meadowsound',       '/javascripts/modules/units/sounds/meadow-loop.mp3');
      this.game.load.audio('squirrel',        '/javascripts/modules/units/sounds/squirrel.wav');
      this.game.load.audio('acorn-on-ground', '/javascripts/modules/units/sounds/acorn_on_grass.wav');
      this.game.load.audio('pickup',          '/javascripts/modules/units/sounds/pickup.mp3');
      this.game.load.audio('walk-sound',       '/javascripts/modules/units/sounds/Walking.mp3');
    },

  create: function() {
    //KEYBOARD ASSIGNMENT//
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(this.checkAcorn, this);
    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.useBugnet, this);

    //START GAME PHYSICS//
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld(); 

    //ADD AUDIO//
    this.squirrel = this.game.add.audio('squirrel'); 
    this.acorn_on_ground = this.game.add.audio('acorn-on-ground');
    this.pickup = this.game.add.audio('pickup');
    this.oakmusic = this.game.add.audio('background-music');
    this.walksound = this.game.add.audio('walk-sound');

    this.oakmusic.volume = 1;
    this.oakmusic.loop = true;
    this.oakmusic.play();

    this.meadowsounds = this.game.add.audio('meadowsound');
    this.meadowsounds.volume = 0.5;
    this.meadowsounds.loop = true;
    this.meadowsounds.play();    

    //ADD IMAGES + HITBOXES//
    this.background2 = this.game.add.image(0,0, 'background-2');
    this.background2.height = this.game.height;
    this.background2.width = this.game.width;

    this.background1 = this.game.add.image(0,0, 'background-1');
    this.background1.height = this.game.height;
    this.background1.width = this.game.width;  

    this.ground = this.game.add.image(0,0, 'ground');
    this.ground.height = this.game.height;
    this.ground.width = this.game.width;  

    this.squirrelhole = this.game.add.sprite(0,0, 'squirrelhole');
    this.squirrelhole.height = this.game.height;
    this.squirrelhole.width = this.game.width;
    
    // this.game.physics.box2d.enable(this.squirrelhole);
    // this.squirrelhole.body.static = true;
    // this.squirrelhole.body.setCircle(30, 805, 190);
    // this.squirrelhole.body.addCircle(30, 805, 210);

    this.iris = this.game.add.sprite(255, 25, 'iris-start');
    this.iris.inputEnabled = true;
    this.iris.useHandCursor = true;
    this.iris.input.priorityID = 100;
    this.iris.events.onInputDown.addOnce(this.spinTire, this);

    this.storyteller();

    //IRIS ACTIONS//
    // this.throwing = this.iris.animations.add('iris-throwing');


    // this.iris = this.game.add.sprite(200, 300, 'iris-stand');
    // this.iris.scale.setTo(0.50, 0.50);

    //SPAWN MULTIPLE ACORNS//
    for (var i=0; i < 5; i++) {
      this.createAcorn(true);
    }

    // IRIS THROWING

    // this.iris = game.add.sprite(100, 180, 'iris-throwing');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('throw');

    // this.iris.animations.play('throw', 2.5, false);

    // IRIS TIRESWINGING

    // this.iris = game.add.sprite(100, 180, 'iris-swing');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('swing');

    // this.iris.animations.play('swing', 2.5, false);

    // IRIS WALKING

    // this.iris = game.add.sprite(100, 180, 'walk-right');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('walk-right');

    // this.iris.animations.play('walk-right', 3, true);

    this.bugnet = this.game.add.sprite(200,150,'bugnet');
    this.game.physics.box2d.enable(this.bugnet);
    this.bugnet.body.static = true;
    this.bugnet.body.setRectangle(80, 70, -10, -40);
    this.bugnet.body.addRectangle(30, 70, 30, 32);


    this.branch = this.game.add.image(0,0, 'branch');
    this.branch.height = this.game.height;
    this.branch.width = this.game.width;
    this.branch.bringToTop();

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.groundCollider.static = true;

    // if (this.irisclicked === true){
    //   this.arrow_right = this.game.add.image(game.width - 100, game.height/2 - 100, 'arrow_right');
    //   this.arrow_right.inputEnabled = true;
    //   this.arrow_right.events.onInputDown.add(function () {
    //   this.iris.loadTexture('walk-right', 0);
    //   this.iris.animations.add('walk-right');
    //   this.iris.animations.play('walk-right', 3, true);
    //   setTimeout(function(){
    //     game.stateTransition.to('Stream', true, true);
    //   }.bind(this), 2000)
    // }.bind(this));
    // }     

    function flatten(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i); }, []); // .inject([]) { |a,i| a << i }
    }

    function toPairs(arr)
    {
      var pairs = [];

      for(var i = 0; i < arr.length; i+= 2)
      {
        pairs.push({x: arr[i], y: arr[i+1]});
      }
      return pairs;
    }

    function fromPairs(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i.x, i.y); }, []);
    }

    function band(d, v1, v2)
    {
      return function(pair)
      {
        return pair[d] >= v1 && pair[d] <= v2;
      };
    }

    function byCoordinate(c)
    {
      return function(a, b)
      {
        if(a[c] == b[c]) { return  0; }
        if(a[c]  < b[c]) { return -1; }
        return 1;
      };
    }

    var points =  
      fromPairs(
        toPairs(
          flatten(ground)
        )
        .filter(band('y', 0, 700))
        .sort(byCoordinate('x'))
      );

    this.groundCollider.setChain(points);
  },

  update: function()
  {
    if (this.acorn) {
      this.acorncount.text = this.hasAcorn;  
    }

    // if (this.checkAcorn) {
    //   if (this.state.mouseX >= this.iris.x){
    //     this.iris.loadTexture('iris-throw-static');
    //   } else {
    //     this.iris.loadTexture('iris-throw-left');
    //   }
    // }

    if (this.irisclicked === true && this.hasBugnet === true){
      this.arrow_right = this.game.add.image(game.width - 100, game.height/2 - 100, 'arrow_right');
      this.arrow_right.inputEnabled = true;
      this.arrow_right.events.onInputDown.add(function () {
        this.walksound.play();
        this.iris.loadTexture('walk-right', 0);
        this.iris.animations.add('walk-right');
        this.walksound.play();
        this.iris.animations.play('walk-right', 3, true);
        var tween = this.game.add.tween(this.iris).to({x: 1000}, 4000, Phaser.Easing.Linear.None, true);
        setTimeout(function()
        {
          game.stateTransition.to('Stream', true, true);
        }.bind(this), 3500);
    }.bind(this));
    }

  },

  render: function()
  {
    // this.game.debug.box2dWorld();
  },

  storyteller: function() {
    setTimeout(function(){
      this.panel1 = this.game.add.image(200, 350, 'story1');
      this.panel1.inputEnabled = true;
      this.panel1.events.onInputDown.add(this.storyteller2, this);
    }.bind(this), 2000);
  },

  storyteller2: function() {
    this.panel1.destroy();
    this.panel2 = this.game.add.image(200, 350, 'story2');
    this.panel2.inputEnabled = true;
    this.panel2.events.onInputDown.add(this.storyteller3, this);
  },

  storyteller3: function() {
    this.panel2.destroy();
    this.panel3 = this.game.add.image(200, 350, 'story3');
    this.panel3.inputEnabled = true;
    this.panel3.events.onInputDown.add(this.storyteller4, this);
  },

  storyteller4: function() {
    this.panel3.destroy();
    this.panel4 = this.game.add.image(200, 350, 'story4');
    this.panel4.inputEnabled = true;
    this.panel4.events.onInputDown.add(this.storyteller5, this);
  },

  storyteller5: function() {
    this.panel4.destroy();
    this.panel5 = this.game.add.image(200, 350, 'story5');
    this.panel5.inputEnabled = true;
    this.panel5.events.onInputDown.add(this.storyteller6, this);
  },

  storyteller6: function() {
    this.panel5.destroy();
    this.panel6 = this.game.add.image(200, 350, 'story6');
    this.panel6.inputEnabled = true;
    this.panel6.events.onInputDown.add(this.storyteller7, this);
  },

  storyteller7: function() {
    this.panel6.destroy();
    this.panel7 = this.game.add.image(200, 350, 'story7');
    this.panel7.inputEnabled = true;
    this.panel7.events.onInputDown.add(this.storyteller8, this);
  },

  storyteller8: function() {
    this.panel7.destroy();
    this.panel8 = this.game.add.image(200, 350, 'story8');
    this.panel8.inputEnabled = true;
    this.panel8.events.onInputDown.add(this.storyteller9, this);
  },

  storyteller9: function() {
    this.panel8.destroy();
    this.panel9 = this.game.add.image(200, 350, 'story9');
    this.panel9.inputEnabled = true;
    this.panel9.events.onInputDown.add(this.storyteller10, this);
  },

  storyteller10: function() {
    this.panel9.destroy();
    this.storydone1 = true;
  },

  storyteller11: function() {
    this.panel11 = this.game.add.image(200, 350, 'story11');
    this.panel11.inputEnabled = true;
    setTimeout(function(){
      this.panel11.destroy();
    }.bind(this), 5000);
  },

  storyteller12: function() {
    this.panel12 = this.game.add.image(200, 350, 'story12');
    this.panel12.inputEnabled = true;
    setTimeout(function(){
      this.panel12.destroy();
    }.bind(this), 5000);
  },

  storyteller13: function() {
    this.panel13 = this.game.add.image(200, 350, 'dontneed');
    this.panel13.inputEnabled = true;
    setTimeout(function(){
      this.panel13.destroy();
    }.bind(this), 5000);
  },

  pickupAcorn: function(acorn) {
    if (this.irisclicked === false || this.storydone1 === false)
    {
      false
    } else {
      this.iris.x = acorn.x - 145;
      this.iris.y = acorn.y - 150;
      this.iris.loadTexture('iris-pickup', 0);

      this.pickup.play();
      this.hasAcorn += 1;
      acorn.destroy();

      setTimeout(function() {
        this.iris.loadTexture('iris-stand');
        this.iris.y = 300;
      }.bind(this), 1000);
        
      this.arrayOfAcorns = this.arrayOfAcorns.filter(function(_acorn) {
        return acorn !== _acorn;
      });
        
      this.acorninventory = this.game.add.image(20, 30, 'acorninventory');
      this.acorncount = this.game.add.text(40, 45, this.hasAcorn, { font: '20px Arial', fill: '#ffffff' });
    }
  },

  pickupBugnet: function(bugnet) {
    this.iris.x = bugnet.x - 145;
    this.iris.y = bugnet.y - 150;
    this.iris.loadTexture('iris-pickup', 0);

    this.pickup.play();
    this.hasBugnet = true;
    bugnet.destroy();

    setTimeout(function() {
      this.iris.loadTexture('iris-stand', 0);
      this.iris.y = 300;
    }.bind(this), 1000);

    this.bugnetinventory = this.game.add.image(80, 30, 'bugnetinventory');
  },

  checkAcorn: function() {
    if (this.hasAcorn !== 0){
        this.iris.loadTexture('iris-throw-static');
        this.acorn = new Projectile(this.game, this.iris.x + 23, this.iris.y + 40, true);
        this.acorn.body.static = true;
        this.game.input.activePointer.leftButton.onDown.addOnce(this.fireAcorn, this);
    }else {
        //AUDIO//
        // this.noneleft.play();
    }
  },

  fireAcorn: function () {
    this.iris.loadTexture('iris-throwing', 0);
    this.iris.animations.add('throw');
    this.iris.animations.play('throw', 12, false);
    this.acorn.destroy();
    this.acorn1 = new Projectile(this.game, this.iris.x, this.iris.y);

    this.checkcollisionacorn();
    this.checkcollisionbugnet();

    this.hasAcorn -= 1;
    this.acorn1.inputEnabled = true;
    this.acorn1.input.useHandCursor = true;
    this.acorn1.events.onInputDown.add(this.pickupAcorn, this);
    this.arrayOfAcorns.push(this.acorn1);

    setTimeout(function() {
        this.iris.loadTexture('iris-stand');
        this.iris.y = 300;
      }.bind(this), 500);
  },

  // tosskey: function()
  // {
  //   this.key = this.game.add.sprite(780,190, 'key1');
  //   this.key.anchor.setTo(0.5, 0.5);
  //   this.key.inputEnabled = true;
  //   this.key.events.onInputDown.add(this.pickupKey(this.key), this);
  //   this.tweenFunctions = [
  //     { name: "Quadratic In", ease: Phaser.Easing.Quadratic.In }
  //   ];
  //   this.game.physics.box2d.enable(this.key);

  //   /*var tween = */this.game.add.tween(this.key).to({
  //     x: [780, 700, 600, 400],
  //     y: [190, 600, 500, 300],
  //     angle: [100]
  //   }, 5000)
  //   .interpolation(function(v, k)
  //   {
  //     return Phaser.Math.catmullRomInterpolation(v, k);
  //   });
  // },

  tosskey: function()
  {
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.key = game.add.sprite(780,190,'key2');
    this.game.physics.box2d.enable(this.key);
    this.key.body.static = false;
    // this.key.destroy();

    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld();     

    // this.bugnet = this.game.add.sprite(200,150,'bugnet');
    // this.game.physics.box2d.enable(this.bugnet);
    // this.bugnet.body.static = true;
    // this.bugnet.body.setRectangle(80, 70, -10, -40);
    // this.bugnet.body.addRectangle(30, 70, 30, 32);  

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.groundCollider.static = true;

    function flatten(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i); }, []); // .inject([]) { |a,i| a << i }
    }

    function toPairs(arr)
    {
      var pairs = [];

      for(var i = 0; i < arr.length; i+= 2)
      {
        pairs.push({x: arr[i], y: arr[i+1]});
      }
      return pairs;
    }

    function fromPairs(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i.x, i.y); }, []);
    }

    function band(d, v1, v2)
    {
      return function(pair)
      {
        return pair[d] >= v1 && pair[d] <= v2;
      };
    }

    function byCoordinate(c)
    {
      return function(a, b)
      {
        if(a[c] == b[c]) { return  0; }
        if(a[c]  < b[c]) { return -1; }
        return 1;
      };
    }

    var points =  
      fromPairs(
        toPairs(
          flatten(ground)
        )
        .filter(band('y', 0, 700))
        .sort(byCoordinate('x'))
      );
    this.key.inputEnabled = true;
    this.key.events.onInputDown.add(this.keyPickup, this);
    this.groundCollider.setChain(points);
  },
 
  bugnetCallback: function()
  {
    this.bugnet.destroy();
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.bugnetx = this.game.add.sprite(200,150,'bugnet');
    this.game.physics.box2d.enable(this.bugnetx);
    this.bugnetx.body.static = false;
    this.acorn1.destroy();   

    this.squirrelhole = this.game.add.sprite(0,0, 'squirrelhole');
    this.squirrelhole.height = this.game.height;
    this.squirrelhole.width = this.game.width;

    this.game.physics.box2d.enable(this.squirrelhole);
    this.squirrelhole.body.static = true;
    this.squirrelhole.body.setCircle(30, 805, 200);   

    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld();     

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.groundCollider.static = true;

    function flatten(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i); }, []); // .inject([]) { |a,i| a << i }
    }

    function toPairs(arr)
    {
      var pairs = [];

      for(var i = 0; i < arr.length; i+= 2)
      {
        pairs.push({x: arr[i], y: arr[i+1]});
      }
      return pairs;
    }

    function fromPairs(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i.x, i.y); }, []);
    }

    function band(d, v1, v2)
    {
      return function(pair)
      {
        return pair[d] >= v1 && pair[d] <= v2;
      };
    }

    function byCoordinate(c)
    {
      return function(a, b)
      {
        if(a[c] == b[c]) { return  0; }
        if(a[c]  < b[c]) { return -1; }
        return 1;
      };
    }

    var points =  
      fromPairs(
        toPairs(
          flatten(ground)
        )
        .filter(band('y', 0, 700))
        .sort(byCoordinate('x'))
      );

    this.groundCollider.setChain(points);
    this.bugnetx.inputEnabled = true;  
    this.bugnetx.events.onInputDown.add(this.pickupBugnet, this);
  },    

  checkcollisionacorn: function()
  {
    this.acorn1.body.setBodyContactCallback(this.squirrelhole, this.squirrelholeCallback, this);
  },

  checkcollisionbugnet: function()
  {
    this.acorn1.body.setBodyContactCallback(this.bugnet, this.bugnetCallback, this);
  },

  spinTire: function()
  {
    this.iris.loadTexture('iris-swing');
    this.iris.animations.add('swing');
    this.iris.animations.play('swing',4,false);

    setTimeout(function(){
      this.iris.loadTexture('iris-start');
    }.bind(this), 1000);

    setTimeout(function(){
      this.background1.visible =! this.background1.visible;
      this.iris.loadTexture('iris-stand');
      this.iris.x = 300;
      this.iris.y = 200;
      this.irisclicked = true;
      this.iris.inputEnabled = false;

    }.bind(this), 3000);
  },

  squirrelholeCallback: function(/*body1, body2, fixture1, fixture2, begin*/)
  {
    // if (this.hasBugnet === true) {
    this.acorn1.destroy();
    this.squirrel.play();
    this.storyteller11();
    this.tosskey();
    // }
  },

  keyPickup: function(key)
  {
    this.iris.x = key.x - 145;
    this.iris.y = key.y - 150;
    this.iris.loadTexture('iris-pickup', 0);
    this.pickup.play();
    this.storyteller12();
    this.hasKey = true;
    key.destroy();

    setTimeout(function() {
      this.iris.loadTexture('iris-stand', 0);
      this.iris.y = 300;
    }.bind(this), 1000);

    this.keyinventory = this.game.add.image(140, 30, 'keyinventory');
  },

  useBugnet: function(key)
  {
    this.storyteller13();
  },

  maintainAcorns: function() {
    return this.hasAcorn;
  },

  maintainBugnet: function() {
    return this.hasBugnet;
  },

  maintainKeys: function() {
    return this.hasKey;
  },

  shutdown: function() {
    this.game.input.activePointer.leftButton.onDown.removeAll();
    this.game.stateTransition = null;
  }
};
