import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


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

scene.add(pointLight, ambientLight)

//helpers
//shows where the light is shining from
const lightHelper = new THREE.PointLightHelper(pointLight)
//displays grid
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

//controls so that I can move the camera around
const controls = new OrbitControls(camera, renderer.domElement);

//adds stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  //randomly positions the xyz for each star. Chooses between -100 and 100
  const [x, y, z] =  Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  //set position to the star and add it to the scene
  star.position.set(x, y, z);
  scene.add(star)
}

//array of 200. For each value in the array, call addStar function
Array(200).fill().forEach(addStar)

//background
const galaxy = new THREE.TextureLoader().load('/public/images/galaxy.png')
scene.background = galaxy;

//animate function so I don't have to copy and paste the same renderer function again and again
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //updates control movements
  controls.update();

  renderer.render(scene, camera);
} 

animate()