import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let carConfig = {
    color:'',
}

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
        gltf.scene.traverse((obj)=>{
            if(obj.isMesh && obj.name.includes('boot001')){
                carConfig.color = obj.material.color;
                console.log(carConfig.color);
            }
        })
        scene.add( gltf.scene );
        settingBox();
    },function (err){
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

const  setCarBootColor = (color) => {
    carConfig.color.set(color);
}

function settingBox(){
    let colorList = ['red','#d2568c','#36292f','#3e3841','#2775b6','#cdd1d3','#f28e16'];
    colorList.forEach((item)=>{
        let block = document.createElement("DIV");
        block.className = 'color-block';
        block.addEventListener('click',()=>{
            setCarBootColor(item);
        })
        block.style.cssText = `background-color:${item}`;
        document.querySelector(".color-select").appendChild(block);
    })
}

init()

