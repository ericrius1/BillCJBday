e.Player = new Class({

  construct: function(options) {
    this.camera = options.camera;
    this.game =  options.game;
    var self = this;


    var loader = new THREE.OBJMTLLoader();
    loader.load('assets/appa.obj', 'assets/appa.mtl', function(object) {
      self.game.scene.add(object);
    });


  }

});