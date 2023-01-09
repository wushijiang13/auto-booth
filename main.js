import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// init
// 相机参数和视角
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
camera.position.z = 1;
camera.position.x = 4;
camera.position.y = 1;

const scene = new THREE.Scene();

//点光灯 曝光10
const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
directionalLight.castShadow = true;
scene.add( directionalLight );

//加载模型
const gltfLoader = new GLTFLoader();
gltfLoader.load('model/car/scene.gltf',function (gltf){
    scene.add( gltf.scene );
},function (err){
    console.log(err);
})

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true,
    precision:"highp"//着色精度
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
//设置背景颜色
renderer.setClearColor(0x2b2b3d,0.5)
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera,renderer.domElement);
// animation

function animation( ) {
    //可拖拽视角
    controls.update();
    renderer.render( scene, camera );
}


