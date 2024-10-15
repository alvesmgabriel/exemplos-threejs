import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let cameraAtual, controles;

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();

// cria a camera
const fator = 20;

// define os limites do volume de visualiação
const cameraPersp = new THREE.OrthographicCamera(
    // esquerda e direita
    -window.innerWidth/fator, window.innerWidth/fator,
    // superior e inferior
    window.innerHeight/fator, -window.innerHeight/fator,
    // perto e longe
    0, 100);

cameraPersp.position.z = 5;

const cameraOrto = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 100);

cameraOrto.position.z = 5;

// informações
console.log('tela:', window.innerWidth, window.innerHeight);
//console.log('CoP:', camera.position.x, camera.position.y, camera.position.z);


// camera atual
cameraAtual = cameraPersp;
//controles = new OrbitControls(cameraAtual, renderizador.domElement);

// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

// criar o cone
const geometry = new THREE.ConeGeometry( 5, 20, 32 ); 
const material = new THREE.MeshBasicMaterial(
    {wireframe:true, color: 0xffff00} );
const cone = new THREE.Mesh(geometry, material);
//cone.position.z = -100;
console.log(cone.position.x, cone.position.y, cone.position.z);

// adiciona o objeto na cena
cena.add( cone );

document.getElementById('troca').addEventListener('click', trocaCamera);

// renderiza a cena
renderizador.render(cena, cameraAtual);

function trocaCamera(){
    if(cameraAtual == cameraPersp){
        cameraAtual = cameraOrto;
    }else{
        cameraAtual = cameraPersp;
    }
    //controles.update();
    renderizador.render(cena, cameraAtual);
}