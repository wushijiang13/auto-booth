import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 相机参数和视角
function init(){
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.set(5,1,1);


    var ambientLight = new THREE.AmbientLight(0xffffff,5);
    scene.add(ambientLight);
    //点光灯 曝光5
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
    directionalLight.castShadow = true;
    scene.add( directionalLight );


    //加载模型
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('model/car/scene.gltf',function (gltf){
        // gltf.scene.traverse((obj)=>{
        //     if(obj.type == 'Mesh'){
        //         obj.material = new THREE.MeshLambertMaterial({
        //             map:obj.material.map,
        //             color:obj.material.color
        //         });
        //     }
        // })
        scene.add( gltf.scene );
    },undefined,function (err){
        console.log(err);
    })

    const renderer = new THREE.WebGLRenderer({
        antialias:true,
        alpha:true,
        precision:"highp"//着色精度
    });

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop(()=>{
        //可拖拽视角
        controls.update();
        renderer.render( scene, camera );
    });
    //设置背景颜色
    renderer.setClearColor(0x2b2b3d,1)
    //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    //将输出canvas的大小调整为(width, height)并考虑设备像素比
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );
    const controls = new OrbitControls(camera,renderer.domElement);
}

init()
