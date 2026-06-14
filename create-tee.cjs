const fs = require('fs');

// A minimal GLB file for a simple box (will serve as a placeholder)
// This is a very basic GLB with just enough structure to load without error
const glbHeader = Buffer.from([
    // GLB magic number (glTF)
    0x67, 0x6C, 0x54, 0x46,  // 'glTF'
    0x02, 0x00, 0x00, 0x00,  // version 2
    0x00, 0x00, 0x00, 0x00,  // length placeholder (will fix later)
]);

// Minimal JSON chunk
const json = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 24, type: "VEC3", min: [-0.5,-0.5,-0.5], max: [0.5,0.5,0.5] }],
    bufferViews: [{ buffer: 0, byteLength: 288, target: 34962 }],
    buffers: [{ byteLength: 288 }]
};

const jsonStr = JSON.stringify(json);
const jsonBuffer = Buffer.from(jsonStr);
const jsonChunkHeader = Buffer.alloc(8);
jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0);
jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4); // 'JSON'

// Minimal BIN chunk (dummy data for 24 vertices * 3 floats * 4 bytes = 288 bytes)
const binBuffer = Buffer.alloc(288, 0);
const binChunkHeader = Buffer.alloc(8);
binChunkHeader.writeUInt32LE(binBuffer.length, 0);
binChunkHeader.writeUInt32LE(0x004E4942, 4); // 'BIN'

// Calculate total length
const totalLength = 12 + 8 + jsonBuffer.length + 8 + binBuffer.length;
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546C67, 0); // 'glTF'
header.writeUInt32LE(2, 4); // version
header.writeUInt32LE(totalLength, 8);

const glb = Buffer.concat([header, jsonChunkHeader, jsonBuffer, binChunkHeader, binBuffer]);
fs.writeFileSync('./public/models/tee.glb', glb);
console.log('Minimal GLB created!');
