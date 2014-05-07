e.Controls = new Class({
  construct: function(options) {
    this.camera = options.camera;
    this.player = options.player;
    this.keyboard = new e.Keyboard();
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.5;
    this.controls.noRotate = true;
    this.controls.noPan= true;
    this.controls.noZoom= true;

  },
  update: function(){
    this.controls.update();

  }
})