const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let videoTexture;
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        videoTexture = new THREE.VideoTexture(video);
        scene.background = videoTexture;
    });

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xff0000,
    transparent: true,
    opacity: 0.8
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(1, 0, 0);
scene.add(cube);

const fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Hola Mundo', {
        font: font,
        size: 0.3,
        height: 0.1,
        curveSegments: 12
    });
    
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1.5, 1, -1);
    scene.add(textMesh);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

camera.position.z = 4;

function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});