window.e = {
  init: function() {
    var loader = new THREE.OBJMTLLoader();
    loader.load('assets/appa.obj', 'assets/appa.mtl', function(object) {
      window.appa = object;
      e.game = new e.Game();
    });
  }

};