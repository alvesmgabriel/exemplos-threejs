import * as THREE from 'three';

// Precisa, basicamente, de 3 coisas:
// 1) cena; 2) camera; 3) renderizador

// cria a cena
const cena = new THREE.Scene();

// cria a camera
const fator = 20;

// define os limites do volume de visualiação
const camera = new THREE.OrthographicCamera(
    // esquerda e direita
    -window.innerWidth/fator, window.innerWidth/fator,
    // superior e inferior
    window.innerHeight/fator, -window.innerHeight/fator,
    // perto e longe
    2, 100);

camera.position.z = 5;

// informações
console.log('tela:', window.innerWidth, window.innerHeight);
console.log('CoP:', camera.position.x, camera.position.y, camera.position.z);


// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

// criar o cone
const geometry = new THREE.ConeGeometry( 5, 20, 32 ); 
const material = new THREE.MeshBasicMaterial(
    {wireframe:true, color: 0xffff00} );
const cone = new THREE.Mesh(geometry, material);

// adiciona o objeto na cena
cena.add( cone );

// renderiza a cena
renderizador.render(cena, camera);

