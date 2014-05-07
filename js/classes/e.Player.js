e.Player = new Class({

  construct: function(options) {
    this.camera = options.camera;
    this.game =  options.game;
    this.game.scene.add(appa);
    appa.rotation.x = -Math.PI/2;
    appa.position.y = this.camera.position.y/2
    this.camera.lookAt(appa.position);
    appa.scale.multiplyScalar(50);
  },

  update: function(){

  }

});