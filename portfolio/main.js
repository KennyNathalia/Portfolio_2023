import './style.css'
import * as THREE from 'three';

//setup
//scene and camera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//canvas renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//torus shape
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

//lighting for shape
//0x stands for hexidecimal literal
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

scene.add(pointLight, ambientLight)

//animate function so I don't have to copy and paste the same renderer function again and again
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
} 

animate()