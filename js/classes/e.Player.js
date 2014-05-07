e.Player = new Class({

  construct: function(options) {
    this.camera = options.camera;
    this.game = options.game;
    this.game.scene.add(appa);
    this.delay = 2000;
    this.turnTime = 1300;
    appa.rotation.x = -Math.PI  * (0.40);
    appa.position.y = 300
    appa.scale.multiplyScalar(300);
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
    var dir = Math.random() > 0.5 ? 1 : -1
    var finalPos = {
      x: appa.position.x + (120 * dir),
      rotX: appa.rotation.x,
      rotY: appa.rotation.y + Math.PI * 2,
      rotZ: appa.rotation.z,
    }
    var rollTween = new TWEEN.Tween(curPos).
    to(finalPos, this.turnTime).
    easing(TWEEN.Easing.Cubic.InOut).
    delay(THREE.Math.randInt(1000, 3000)).
    onUpdate(function() {
      appa.position.x = curPos.x;
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


    var dir = Math.random() > 0.5 ? 1 : -1
    var finalSomersaultPosition = {
      x: appa.position.x,
      y: appa.position.y + (dir * 150),
      z: appa.position.z  + (100 * dir),
      rotX: appa.rotation.x += 2 * Math.PI,
      rotY: appa.rotation.y,
      rotZ: appa.rotation.z,
    }
    var somersaultTween = new TWEEN.Tween(curPos).
    to(finalSomersaultPosition, this.turnTime).
    delay(THREE.Math.randInt(1000, 3000)).
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