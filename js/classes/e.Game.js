e.Game = new Class({
  extend: e.EventEmitter,

  construct: function() {
    // Bind render function permenantly
    this.render = this.render.bind(this);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100000);
    this.camera.position.set(0, 200, 400);


    var ambientLight = new THREE.AmbientLight(0x555555);
    this.scene.add(ambientLight);

    //FOG
    this.scene.fog = new THREE.Fog(0xffffff, 3000, 10000);
    this.scene.fog.color.setHSL(0.5, 0.4, 0.4);
    this.renderer.setClearColor(this.scene.fog.color, 1);

    var spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1);
    spotLight.position.set(0, 1800, 1500);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    this.player = new e.Player({
      game: this,
      camera: this.camera
    });

    this.world = new e.World({
      game: this
    });


    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);


    this.clock = new THREE.Clock();

    this.controls = new e.Controls({
      camera: this.camera,
      player: this.player
    });

    this.start();
  },

  start: function() {
    requestAnimationFrame(this.render);
  },

  render: function() {
    this.controls.update();
    this.world.update();
    this.player.update();
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  },

  onWindowResize: function() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }



});