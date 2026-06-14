import pkg from 'gltf-pipeline';
const { gltfToGlb } = pkg;
import { writeFileSync } from 'fs';

// Simple glTF JSON for a basic T-shirt shape
const gltf = {
    "asset": { "version": "2.0" },
    "scene": 0,
    "scenes": [{ "nodes": [0] }],
    "nodes": [{
        "mesh": 0,
        "name": "Tee"
    }],
    "meshes": [{
        "name": "TeeMesh",
        "primitives": [{
            "mode": 4,
            "attributes": {
                "POSITION": 0,
                "NORMAL": 1
            },
            "material": 0
        }]
    }],
    "materials": [{
        "name": "TeeMaterial",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.8, 0.8, 0.8, 1.0],
            "metallicFactor": 0.0,
            "roughnessFactor": 0.7
        }
    }],
    "accessors": [
        {
            "bufferView": 0,
            "componentType": 5126,
            "count": 24,
            "type": "VEC3",
            "min": [-0.75, -0.9, -0.075],
            "max": [0.75, 0.9, 0.075]
        },
        {
            "bufferView": 1,
            "componentType": 5126,
            "count": 24,
            "type": "VEC3"
        }
    ],
    "bufferViews": [
        {
            "buffer": 0,
            "byteLength": 288,
            "byteOffset": 0,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteLength": 288,
            "byteOffset": 0,
            "target": 34962
        }
    ],
    "buffers": [
        { "byteLength": 288, "uri": "data:application/octet-stream;base64," },
        { "byteLength": 288, "uri": "data:application/octet-stream;base64," }
    ]
};

try {
    const glb = await gltfToGlb(gltf);
    writeFileSync('./public/models/tee.glb', Buffer.from(glb));
    console.log('Tee model created successfully!');
} catch (e) {
    console.error('Error:', e.message);
}
