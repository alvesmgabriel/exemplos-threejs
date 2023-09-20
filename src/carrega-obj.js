import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();
cena.add(new THREE.AxesHelper(10));

cena.background = new THREE.Color(0xffffff);

// cria a camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000);
camera.position.z = 5;

// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

new OrbitControls(camera, renderizador.domElement);


// fim de preparação do aplicação

// popular a cena
// carrega o arquivo OBJ
const objeto = new OBJLoader();
objeto.load('../assets/homem.obj',
    (obj) => {
      cena.add(obj); // carrega o obj na cena  
    },
    (progresso) => {
        console.log( (progresso.loaded / progresso.total) * 100 + "%");
    },
    (erro) => {
        console.log(erro);
    }
);


window.addEventListener('resize', ajustarTela, false);

// função ajustarTela
function ajustarTela() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.render(cena, camera);
}



function animacao(){
    requestAnimationFrame( animacao );

    // renderiza a cena
    renderizador.render(cena, camera);
}

animacao();