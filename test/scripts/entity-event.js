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

AFRAME.registerComponent('register-events', {
    init: function () {
        this.el.addEventListener('markerFound', this.onMarkerFound);
        this.el.addEventListener('markerLost', this.onMarkerLost);
    },
    onMarkerFound: function () {
        currentElement = this;
        console.log('found=======================================================');
        console.log(`position=${JSON.stringify(currentElement.object3D.position)}`);
        console.log(`rotation=${JSON.stringify(currentElement.object3D.rotation)}`);
        console.log(`scale=${JSON.stringify(currentElement.object3D.scale)}`);
    },
    onMarkerLost: function () {
        console.log('lost');
    }
});

let currentElement = null;

function appendHtml(el, str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

function save() {
    if (currentElement === null || currentElement === undefined) {
        console.log("No element was found on camera");
        return;
    }
    let scene = document.getElementById('scene');
    let position = currentElement.object3D.position;
    let rotation = currentElement.object3D.rotation;
    let scale = currentElement.object3D.scale;
    let attribute = "";
    attribute = attribute + ` position="${position.x} ${position.y} ${position.z}" `;
    attribute = attribute + ` rotation="${rotation.x} ${rotation.y} ${rotation.z}" `;
    attribute = attribute + ` scale="${scale.x} ${scale.y} ${scale.z}" `;

    appendHtml(scene, `<a-entity gltf-model="#butterfly" ${attribute} kscale="4" animation-mixer shadow="cast: true; receive: true;"></a-entity>`);
}

window.save = save;
