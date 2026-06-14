import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFileSync } from 'fs';

// Create a simple tee shirt shape
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

// Export to GLB
const exporter = new GLTFExporter();
exporter.parse(group, (gltf) => {
    const fs = await import('fs');
    fs.writeFileSync('tee.glb', Buffer.from(gltf));
    console.log('Tee model created successfully!');
}, { binary: true });
