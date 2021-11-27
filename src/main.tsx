import ReactDOM from 'react-dom'
import React, { useEffect } from 'react'
import * as THREE from "three";
import { vertexShader, fragmentShader } from './shader';

const App = () => {

  useEffect(() => {


//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer

var main: any;
var content: any;
var container: any;
var camera: any, scene: any, renderer: any;
var uniforms: any;
var startTime: any;
var canvasWidth;
var canvasHeight;

init(); //init scene
animate(); //updateScene

function init() {
//get contenaire
main = document.getElementById('main');
content = document.getElementById('content');
container = document.getElementById('container');

//Create THREE.JS scene and timer
startTime = Date.now();
camera = new THREE.Camera();
camera.position.z = 1;
scene = new THREE.Scene();

//create a simple plance
var geometry = new THREE.PlaneBufferGeometry(16, 9);

//create uniform table which provide all our GLSL binding
uniforms = {
time: { type: "f", value: 1.0 },
resolution: { type: "v2", value: new THREE.Vector2() }
};

//create THREE.JS material
var material = new THREE.ShaderMaterial( {
//set shaders and uniforms into material
uniforms: uniforms,
vertexShader: vertexShader,
fragmentShader: fragmentShader
} );

//create mesh, add it to the scene
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//create renderer and add it to the DOM
renderer = new THREE.WebGLRenderer();
container.appendChild(renderer.domElement);

//check window for resize This will give us the proper resolution values to bind
onWindowResize();
window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
//send new size value to the shader and resize the window
uniforms.resolution.value.x = canvasWidth;
uniforms.resolution.value.y = canvasHeight;

renderer.setSize(canvasWidth, canvasHeight);
}

function animate() {
render();
requestAnimationFrame(animate);
}

function render() {
var currentTime = Date.now();
var elaspedSeconds =  (currentTime - startTime) / 1000.0;
uniforms.time.value = elaspedSeconds;

renderer.render(scene, camera);
}


  }, [])

  return (
    <React.Fragment>
          {/* Replace with your content */}
            <div id="main">
              <div id="content"></div>
              <div id="container"></div>	
          </div>
          {/* /End replace */}
    </React.Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);