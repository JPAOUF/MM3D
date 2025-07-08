import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CharacterController } from './maController.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );  

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.panSpeed = 2;
controls.rotateSpeed = 2;
controls.keys = {
  LEFT: 'KeyA',
  UP: 'KeyW',
  RIGHT: 'KeyD',
  BOTTOM: 'KeyS'
}
controls.listenToKeyEvents(window);
controls.keyPanSpeed = 20;
camera.position.set( 0, 6, 6 );
controls.update();

const KP = {};
let I = 0;

window.addEventListener('keydown', (event) => {
  KP[event.code] = true;

  if (event.code.startsWith('Digit')) {
      const index = Number(event.code.slice(-1));
        if (index < characterController.length) {
          I = index;
        }
  }

  if (event.code == 'KeyN') {  
      I++;
        if (I >= characterController.length) {
          I = 0;
        }
  }
  if (event.code == 'KeyP') {
      I--;
        if (I < 0) {
          I = characterController.length - 1;
        }
  }

});

window.addEventListener('keyup', (event) => {
  KP[event.code] = false;
});

const loader = new GLTFLoader();
let model; 
const characterController = [];

loader.load('character1.glb', function ( gltf ) {
  
  model = gltf.scene;
  for(let i=0;i<2;i++){
    characterController[i] = new CharacterController(model.clone(), 0.1);
    scene.add(characterController[i].model);
  }

}, undefined, function ( error ) {

  console.error( error );

} 
);

function animate() {
  requestAnimationFrame( animate );
  
  if (characterController[I]) {
    characterController[I].update(KP);
  }

  controls.update();
  renderer.render( scene, camera );
}

animate();
