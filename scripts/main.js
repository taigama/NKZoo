initMain = function() {
    window.initAutoScaleCenterGLTF();
}
initAutoScaleCenterGLTF = function() {
    AFRAME.registerComponent('kscale', {
        schema: {type: 'number', default: 1},
        init: function () {
          this.scale();
          this.el.addEventListener('object3dset', () => this.scale());
          //this.el.addEventListener('click', () => this.onClickModel());
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
      
          // Recenter. // a-frame centered it already.
        //   const offset = bbox.getCenter().multiplyScalar(scale);
        //   mesh.position.sub(offset);
        },
        // onClickModel: function() {// (evt) is always null
        //     console.log("clicked: ");
        //     console.log(this.el);
        // }
      });
}

window.initMain();