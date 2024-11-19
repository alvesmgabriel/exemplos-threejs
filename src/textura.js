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
    0, 100);

camera.position.z = 5;

// informações
console.log('tela:', window.innerWidth, window.innerHeight);
console.log('CoP:', camera.position.x, camera.position.y, camera.position.z);


// cria o renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderizador.domElement );

// cria a textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('../assets/grama.jpg');

// criar o cone
const geometry = new THREE.BoxGeometry( 5, 20, 32 ); 
const material = new THREE.MeshPhongMaterial(
    {wireframe:false, color: 0xfffff} );
material.map = texture;
const cubo = new THREE.Mesh(geometry, material);
//cone.position.z = -100;
console.log(cubo.position.x, cubo.position.y, cubo.position.z);


//TODO: Incluir fonte de luz

// adiciona o objeto na cena
cena.add( cubo );

// renderiza a cena
renderizador.render(cena, camera);
