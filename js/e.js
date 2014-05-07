window.e = {
  init: function() {
    var loader = new THREE.OBJMTLLoader();
    window.audio = new Audio('assets/avatar.mp3');
    loader.load('assets/appa.obj', 'assets/appa.mtl', function(object) {
      var elem = document.getElementById("loading");
      elem.parentNode.removeChild(elem);
      window.appa = object;
      e.game = new e.Game();
      audio.play();
    });
  }

};