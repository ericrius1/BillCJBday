e.Game = new Class({
  extend: e.EventEmitter,

  construct: function() {
    // Bind render function permenantly
    this.render = this.render.bind(this);

    this.scene1Duration = 43000;
    // this.scene1Duration = 3000;
    this.scene1 = true;
    this.startingTime = Date.now();
    this.flyTime = this.startingTime + this.scene1Duration;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000000);
    this.camera.position.set(0, 264, 2127);

    //PHOTO
    var photoTexture = THREE.ImageUtils.loadTexture('assets/photo.jpg');
    var mat = new THREE.MeshBasicMaterial({map: photoTexture});
    var geo = new THREE.PlaneGeometry(120000, 93000);
    var photo = new THREE.Mesh(geo, mat);
    photo.position.y = 31000;
    photo.position.z = -160000;
    this.scene.add(photo);


    var ambientLight = new THREE.AmbientLight(0x555555);
    this.scene.add(ambientLight);

    this.renderer.setClearColor(0xb6a7c8, 1);

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
    if(this.scene1){
      this.controls.update();
      var currentTime = Date.now();
      if(currentTime > this.flyTime){
        this.scene1 = false;
        this.controls.enabled = false;
        this.scene2 = true;
        this.flyToEnd();
      }
    }

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
  },

  flyToEnd: function(){
    var self = this;
    var curPos = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      rotY: this.camera.rotation.y
    }
    var finalPos = {
      x: this.camera.position.x,
      y: this.camera.position.y + 30000,
      z: this.camera.position.z,
      rotY: 0
    }
    var camTween = new TWEEN.Tween(curPos).
      to(finalPos, 30000).
      easing(TWEEN.Easing.Quartic.In).
      onUpdate(function(){
        self.camera.position.set(curPos.x, curPos.y,  curPos.z);
        self.camera.rotation.y = curPos.rotY;
      }).start();
      camTween.onComplete(function(){
        console.log('complete');
      })

  }



});