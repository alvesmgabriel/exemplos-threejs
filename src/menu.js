import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();
cena.add(new THREE.AxesHelper(2));

// cria a camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000);
camera.position.z = 5;

// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

// fim de preparação do aplicação

// popular a cena
// inserir objetos na cena

// criar um objeto e inseri-lo na cena
// Passo 1: criar a geometria
const geometria = new THREE.BoxGeometry();

// Passo 2: criar o material para o objeto
const material = new THREE.MeshBasicMaterial(
    {wireframe: true, color: 0xff0000}); // cor

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

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const pastaCubo = gui.addFolder('Cubo');
pastaCubo.add(cubo.rotation, 'x', 0, Math.PI * 2, 0.01);
pastaCubo.add(cubo.rotation, 'y', 0, Math.PI * 2, 0.01);
pastaCubo.add(cubo.rotation, 'z', 0, Math.PI * 2, 0.01);
pastaCubo.open();

const pastaCamera = gui.addFolder('Camera');
pastaCamera.add(camera.position, 'x', -20, 20, 1);
pastaCamera.add(camera.position, 'y', -20, 20, 1);
pastaCamera.add(camera.position, 'z', -20, 20, 1);
pastaCamera.open();

const pastaCuboPosition = gui.addFolder('Posição do cubo');
pastaCuboPosition.add(cubo.position, 'x', -20, 20, 1);
pastaCuboPosition.add(cubo.position, 'y', -20, 20, 1);
pastaCuboPosition.add(cubo.position, 'z', -20, 20, 1);
pastaCuboPosition.open();


function animacao(){
    requestAnimationFrame( animacao );
    //cubo.rotation.x += 0.01;
    //cubo.rotation.y += 0.01;
    renderiza();
}

// renderiza a cena
function renderiza(){
    renderizador.render(cena, camera);
    stats.update();
}

animacao();
//renderiza();