initSound = function() {
    var listener = new THREE.AudioListener();

    // create a global audio source
    window.sound = new THREE.Audio( listener );
    window.sound.setVolume(1);
    window.sound.setLoop(false);

    window.registerSounds();
}

registerSounds = function() {

    AFRAME.registerComponent('marker_sound', {// component for the marker
        schema: {type: 'string', default: ""},
        init: function () {
            var strs = this.data.split(" ");
            if(!strs || strs.length == 0)
                return;
    
            var name = strs[0];
            window[name] = this;
    
            var p = "";
            this.buffers = [];
            
            var audioLoader = new THREE.AudioLoader();
            for(let i = 1; i < strs.length; ++i) {
                p = "/assets/sounds/" + name + "/" + strs[i] + ".mp3";
                audioLoader.load(p, ( buffer ) => {
                    this.buffers.push(buffer);
                });
            }

            let marker = this.el;
            marker.addEventListener('markerFound', () => {
                if(window.sound.sourceType != "empty") {
                    window.sound.stop();
                }
                window.sound.setBuffer(this.buffers[Math.floor(Math.random() * this.buffers.length)]);
                window.sound.play();
                console.log("play sound!");
    
            });
            marker.addEventListener('markerLost', () => {
                if(this.buffers.includes(window.sound.buffer)
                    && window.sound.sourceType != "empty")
                    window.sound.stop();
            });
        }
    
    });
}