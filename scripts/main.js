initMain = function() {
    window.initAutoScaleCenterGLTF();

    if(window.initSound) {
      window.initSound();
    }
}
initAutoScaleCenterGLTF = function() {
  AFRAME.registerComponent('kscale', {
    schema: {type: 'number', default: 1},
    init: function () {
      this.scale();
      this.el.addEventListener('object3dset', () => this.scale());
    },
    scale: function () {
      const el = this.el;
      const span = this.data;
      const mesh = el.getObject3D('mesh');
  
      if (!mesh) return;
  
      // Compute bounds.
      const bbox = new THREE.Box3().setFromObject(mesh);
  
      // Normalize scale.
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);
    },
  });
}


resetButtonSize = function() {
  var small = screen.width < screen.height? screen.width:screen.height;
  small = small/5;
  document.getElementById("btn").style.width = "" + small + "px";
  document.getElementById("btn").style.height = "" + small + "px";
}

window.initMain();

// window.addEventListener('resize', function(event){
//   window.resetButtonSize();
// });