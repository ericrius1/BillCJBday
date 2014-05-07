e.World = new Class({

  construct: function(options) {
    this.game = options.game;


    var parameters = {
      width: 300,
      height: 300,
      widthSegments: 250,
      heightSegments: 250,
      depth: 1500,
      param: 4,
      filterparam: 1
    }


    var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
    directionalLight.position.set(-1, 0.4, -1);
    this.game.scene.add(directionalLight);

    var waterNormals = new THREE.ImageUtils.loadTexture('assets/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    this.water = new THREE.Water(this.game.renderer, this.game.camera, this.game.scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      sunColor: 0xffffff,
      sunDirection: directionalLight.position.normalize(),
      waterColor: 0x001e0f,
      distortionScale: 50.0,
    });


    var mirrorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(parameters.width * 500, parameters.height * 500, 50, 50),
      this.water.material
    );


    mirrorMesh.add(this.water);
    mirrorMesh.rotation.x = -Math.PI * 0.5;
    this.game.scene.add(mirrorMesh);
    var origin = new THREE.Vector3(0,0,0);
    _.each(mirrorMesh.geometry.vertices, function(vertex){
      if(origin.distanceTo(vertex) > 10000){
        vertex.z = 10000;
      }
    });

  },

  update: function() {
    this.water.material.uniforms.time.value += 1.0 / 60.0;
    this.water.render();
  },

  changeSky: function(){
    var self = this;
    var color = this.game.renderer.getClearColor().clone();
    var curColor = {
      r: color.r,
      g: color.g,
      b: color.b,
    };
    var finalCol = {
      r: 0.51,
      g: 0.133,
      b: 0.043
    };
    var skyTween = new TWEEN.Tween(curColor).
      to(finalCol, 11000).
      easing(TWEEN.Easing.Cubic.InOut).
      repeat(1).
      yoyo(true).
      onUpdate(function(){
        color.setRGB(curColor.r, curColor.g, curColor.b);
        self.game.renderer.setClearColor(color);
      }).start()
  }

});