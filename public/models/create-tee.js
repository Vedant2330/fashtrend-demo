const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');
const { BoxGeometry, Mesh, MeshStandardMaterial, Group } = require('three');

const exporter = new GLTFExporter();
const group = new Group();

// Body
const bodyGeo = new BoxGeometry(1.5, 1.8, 0.15);
const bodyMat = new MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7 });
const body = new Mesh(bodyGeo, bodyMat);
body.position.y = 0;
group.add(body);

// Sleeves
const sleeveGeo = new BoxGeometry(0.4, 1.0, 0.5);
const sleeveMat = new MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7 });

const leftSleeve = new Mesh(sleeveGeo, sleeveMat);
leftSleeve.position.set(-0.95, 0.4, 0);
group.add(leftSleeve);

const rightSleeve = new Mesh(sleeveGeo, sleeveMat);
rightSleeve.position.set(0.95, 0.4, 0);
group.add(rightSleeve);

// Neck
const neckGeo = new BoxGeometry(0.4, 0.2, 0.2);
const neckMat = new MeshStandardMaterial({ color: 0xcccccc });
const neck = new Mesh(neckGeo, neckMat);
neck.position.y = 0.95;
group.add(neck);

const exporter2 = new GLTFExporter();
exporter2.parse(group, (gltf) => {
    const fs = require('fs');
    fs.writeFileSync('tee.glb', Buffer.from(gltf));
    console.log('Tee model created successfully!');
}, { binary: true });
