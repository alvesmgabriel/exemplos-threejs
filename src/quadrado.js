import * as THREE from 'three';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();

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
const geometria = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0,  1.0, 0.0, // P0
    -1.0, -1.0, 0.0, // P1
     1.0, -1.0, 0.0, // P2
     1.0,  1.0, 0.0  // P39h
    ]);
// adiciona os dados na geometria
geometria.setAttribute('position',
    new THREE.BufferAttribute(vertices, 3));

const indices = new Uint16Array([
    0, 1, 2, // T1
    0, 2, 3  // T2
]);
geometria.setIndex(new THREE.BufferAttribute(indices, 1));


// Passo 2: criar o material para o objeto
const material = new THREE.MeshBasicMaterial({wireframe: false, color: 0xff0000}); // cor
// Passo 3: gerar o objeto!
const quadrado = new THREE.Mesh(geometria, material);

// Passo 4: inserir objeto na cena
cena.add( quadrado );

function animacao(){
    requestAnimationFrame( animacao );
    quadrado.rotation.x += 0.01;
    quadrado.rotation.y += 0.01;
    // renderiza a cena
    renderizador.render(cena, camera);
}

animacao();