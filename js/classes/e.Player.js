e.Player = new Class({

  construct: function(options) {
    this.camera = options.camera;
    this.game = options.game;
    this.game.scene.add(appa);
    appa.rotation.x = -Math.PI / 2;
    appa.position.y = this.camera.position.y / 2
    this.camera.lookAt(appa.position);
    appa.scale.multiplyScalar(50);

    this.roll();



  },

  roll: function() {
    var self = this;
    var curPos = {
      x: appa.position.x,
      y: appa.position.y,
      z: appa.position.z,
      rotX: appa.rotation.x,
      rotY: appa.rotation.y,
      rotZ: appa.rotation.z,
    }

    var finalPos = {
      rotX: appa.rotation.x,
      rotY: appa.rotation.y + Math.PI * 2,
      rotZ: appa.rotation.z,
    }
    var rollTween = new TWEEN.Tween(curPos).
    to(finalPos, 2000).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      console.log('yay');
      appa.rotation.set(curPos.rotX, curPos.rotY, curPos.rotZ);
    }).start();
    rollTween.onComplete(function() {
      self.somersault();
    });
  },

  somersault: function() {
    var self = this;

    var startingPos = appa.position.clone();

    var curPos = {
      x: appa.position.x,
      y: appa.position.y,
      z: appa.position.z,
      rotX: appa.rotation.x,
      rotY: appa.rotation.y,
      rotZ: appa.rotation.z,
    }



    var finalSomersaultPosition = {
      x: appa.position.x,
      y: appa.position.y + 50,
      z: appa.position.z - 50,
      rotX: appa.rotation.x += 2 * Math.PI,
      rotY: appa.rotation.y,
      rotZ: appa.rotation.z,
    }
    var somersaultTween = new TWEEN.Tween(curPos).
    to(finalSomersaultPosition, 2000).
    easing(TWEEN.Easing.Cubic.InOut).
    yoyo(true).
    repeat(1).
    onUpdate(function() {
      appa.rotation.x = curPos.rotX; 
      appa.position.set(curPos.x, curPos.y, curPos.z)
    });
    somersaultTween.onComplete(function() {
      self.roll();
    }).start();

  },

  update: function() {

  }

});