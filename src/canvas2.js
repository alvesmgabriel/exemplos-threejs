import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();

// cria a camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000);
camera.position.z = 5;

const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera2.position.z = 5;

// cria o renderizador
const canvas1 = document.getElementById('c1');
const canvas2 = document.getElementById('c2');

const renderizador = new THREE.WebGLRenderer({
    canvas: canvas1});
renderizador.setSize(300, 300);

const renderizador2 = new THREE.WebGLRenderer({
    canvas: canvas2});
renderizador2.setSize(300, 300);

new OrbitControls(camera, renderizador.domElement);


// fim de preparação do aplicação

// popular a cena
// inserir objetos na cena

// criar um objeto e inseri-lo na cena
// Passo 1: criar a geometria
const geometria = new THREE.BoxGeometry();

// Passo 2: criar o material para o objeto
const material = new THREE.MeshBasicMaterial(
    {wireframe: true, color: 0xffff00}); // cor

// Passo 3: gerar o objeto!
const cubo = new THREE.Mesh(geometria, material);

// Passo 4: inserir objeto na cena
cena.add( cubo );

window.addEventListener('resize', ajustarTela, false);

// função ajustarTela
function ajustarTela() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderiza();
}



function animacao(){
    requestAnimationFrame( animacao );
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    renderiza();
}

// renderiza a cena
function renderiza(){
    renderizador.render(cena, camera);
    renderizador2.render(cena, camera2);
}

animacao();