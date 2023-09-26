import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();
cena.add(new THREE.AxesHelper(5));

// cria a camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000);
camera.position.z = 5;

// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

// cria um controle de órbita
const orbita = new OrbitControls(camera,
    renderizador.domElement);


// fim de preparação do aplicação

// popular a cena
const objeto1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color: 0xff0000,
    wireframe: true})
);
cena.add(objeto1);
objeto1.position.set(-2, 0, 0);
objeto1.add(new THREE.AxesHelper(3));

const objeto2 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({color: 0xffff00,
    wireframe: true})
);
objeto1.add(objeto2);
objeto2.position.set(2, 0, 0);
objeto2.add(new THREE.AxesHelper(3));

const objeto3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({color: 0x00ff00,
    wireframe: true})
);
objeto2.add(objeto3);
objeto3.position.set(3, 0, 0);
objeto3.add(new THREE.AxesHelper(3));

// cria menu de interação
const gui = new GUI();
const objeto1Folder = gui.addFolder('Objeto 1');
objeto1Folder.add(objeto1.position, 'x', -10, 10, 0.1).name("Posição X");
objeto1Folder.add(objeto1.scale, 'x', 0, 2, 0.1).name("Scale X");
objeto1Folder.add(objeto1.rotation, 'x', 0, Math.PI * 2, 0.1).name("Rotação X");
objeto1Folder.open();

const objeto2Folder = gui.addFolder('Objeto 2');
objeto2Folder.add(objeto2.position, 'x', -10, 10, 0.1).name("Posição X");
objeto2Folder.add(objeto2.scale, 'x', 0, 2, 0.1).name("Scale X");
objeto2Folder.add(objeto2.rotation, 'x', 0, Math.PI * 2, 0.1).name("Rotação X");
objeto2Folder.open();

const objeto3Folder = gui.addFolder('Objeto 3');
objeto3Folder.add(objeto3.position, 'x', -10, 10, 0.1).name("Posição X");
objeto3Folder.add(objeto3.scale, 'x', 0, 2, 0.1).name("Scale X");
objeto3Folder.add(objeto3.rotation, 'x', 0, Math.PI * 2, 0.1).name("Rotação X");
objeto3Folder.open();


window.addEventListener('resize', ajustarTela, false);

// função ajustarTela
function ajustarTela() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // importante para refletir o redimensionamento da tela
    camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.render(cena, camera);
}



function animacao(){
    requestAnimationFrame( animacao );
    orbita.update();
    // renderiza a cena
    renderizador.render(cena, camera);
}

animacao();