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
const cuboGeometria = new THREE.BoxGeometry();
const esferaGeometria = new THREE.SphereGeometry();
const planoGeometria = new THREE.PlaneGeometry();

//const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshNormalMaterial({wireframe: false});

const cubo = new THREE.Mesh(cuboGeometria, material);
cubo.position.x = 5;
cena.add(cubo);

const esfera = new THREE.Mesh(esferaGeometria, material);
esfera.position.x = 3;
cena.add(esfera);

const plano = new THREE.Mesh(planoGeometria, material);
plano.position.x = 0;
cena.add(plano);


// cria menu de interação
const gui = new GUI();
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'transparent')
    .onChange(()=>{(material.needsUpdate = true)});
materialFolder.add(material, 'opacity', 0, 1, 0.1);
materialFolder.open();


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