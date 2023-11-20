import * as THREE from 'three';
import Stats from 'stats.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
var mug = new THREE.Scene();
var stats = createStats();
var deltaTheta = [ 0, 0, 0 ];
var scale = 2;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.domElement);

const lightAmb = new THREE.AmbientLight(0x707070);
scene.add(lightAmb);
const lightDir = new THREE.DirectionalLight(0xffffff, 3);
scene.add(lightDir);
scene.add(lightDir.target);

window.addEventListener('keypress', checkInput, false); // global eventListeners are for keyboard and mouse input
window.addEventListener("wheel", zoom, {passive:false});

const loader = new GLTFLoader();

loader.load( '/mug.glb', function ( gltf ) {
        mug = gltf.scene;
	scene.add( gltf.scene );

}, undefined, function ( error ) {
	console.error( error );
} );

camera.position.z = 5;

function zoom(event){
        event.preventDefault(); //prevent any use of scrolling within the webpage
        console.log(event.deltaY) //use deltaY to alter the overall scale
        scale += event.deltaY * 0.0005;
}
function checkInput(event){
        var name = event.code;
        if(name == 'KeyW'){deltaTheta[0] += 0.001;}
        if(name == 'KeyS'){deltaTheta[0] -= 0.001;}
        if(name == 'KeyD'){deltaTheta[1] -= 0.001;}
        if(name == 'KeyA'){deltaTheta[1] += 0.001;}
        if(name == 'KeyE'){deltaTheta[2] += 0.001;}
        if(name == 'KeyQ'){deltaTheta[2] -= 0.001;}
        if(name == 'KeyZ'){deltaTheta[2] += -deltaTheta[2];}
        if(name == 'KeyC'){deltaTheta[1] += -deltaTheta[1];}
        if(name == 'KeyX'){deltaTheta[0] += -deltaTheta[0];}
        if(name == 'KeyF'){
          deltaTheta[0] += -deltaTheta[0];
          deltaTheta[1] += -deltaTheta[1];
          deltaTheta[2] += -deltaTheta[2];
        }
        if(name == 'KeyR'){
          deltaTheta[0] += -deltaTheta[0];
          deltaTheta[1] += -deltaTheta[1];
          deltaTheta[2] += -deltaTheta[2];
          mug.rotation.x = 0;
          mug.rotation.y = 0;
          mug.rotation.z = 0;
        }
      }

function animate() {
        mug.rotation.x += deltaTheta[0];
        mug.rotation.y += deltaTheta[1];
        mug.rotation.z += deltaTheta[2];
        mug.scale.set(scale, scale, scale);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
        stats.update();
}

function createStats() {
        var stats = new Stats();
        stats.setMode(0);
  
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0';
        stats.domElement.style.top = '0';
  
        return stats;
}
animate();