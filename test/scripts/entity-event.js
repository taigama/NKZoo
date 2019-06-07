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
        currentElement = this.querySelector("a-entity");
        let position = new THREE.Vector3();
        let rotation = new THREE.Euler();
        let scale = currentElement.getObject3D('mesh').scale;
        currentElement.object3D.getWorldPosition(position);
        currentElement.object3D.getWorldQuaternion(rotation);

        console.log('found=======================================================');
        console.log(`id=${JSON.stringify(currentElement.getAttribute('id'))}`);
        console.log(`position=${JSON.stringify(position)}`);
        console.log(`rotation=${JSON.stringify(rotation)}`);
        console.log(`scale=${JSON.stringify(scale)}`);
    },
    onMarkerLost: function () {
        console.log('lost');
    },
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
    let position = new THREE.Vector3();
    let rotation = new THREE.Euler();
    let scale = currentElement.getObject3D('mesh').scale;

    currentElement.object3D.getWorldPosition(position);
    currentElement.object3D.getWorldQuaternion(rotation);

    let attribute = "";
    attribute = attribute + ` position="${position.x} ${position.y} ${position.z}" `;
    attribute = attribute + ` rotation="${THREE.Math.radToDeg(rotation.x)} ${THREE.Math.radToDeg(rotation.y)} ${THREE.Math.radToDeg(rotation.z)}" `;
    attribute = attribute + ` scale="${scale.x} ${scale.y} ${scale.z}" `;

    appendHtml(scene, `<a-entity gltf-model="#butterfly" ${attribute} animation-mixer shadow="cast: true; receive: true;"></a-entity>`);
}

window.save = save;
