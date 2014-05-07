window.e = {
  init: function() {
    var loader = new THREE.OBJMTLLoader();
    window.audio = new Audio('assets/avatar.mp3');
    loader.load('assets/appa.obj', 'assets/appa.mtl', function(object) {
      window.appa = object;
      audio.play();
      e.game = new e.Game();
    });
  }

};