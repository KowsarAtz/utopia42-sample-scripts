const baseParams = [
    {
        label: "Block Type",
        name: "blockType",
        type: "blockType",
        required: true,
    },
    {
        label: 'Starting Position',
        name: "startingPosition",
        type: "position",
        required: true,
    },
    {
        label: "Voxel File URL",
        name: "voxUrl",
        type: "text",
        required: true,
    },
];

function getVoxelsMins(voxels) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    for (const voxel of voxels) {
        minX = voxel.x < minX ? voxel.x : minX;
        minY = voxel.y < minY ? voxel.y : minY;
        minZ = voxel.z < minZ ? voxel.z : minZ;
    }
    return { x: minX, y: minY, z: minZ };
}

async function main() {
    importScripts("https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@main/parser-samples/scriptjs-test/bundle.js");
    const inputs = await UtopiaApi.getInputsFromUser(baseParams);
    const buffer = await (await fetch(new Request(inputs.voxUrl))).arrayBuffer();
    const data = vox.parseMagicaVoxel(buffer);

    const pos = inputs.startingPosition;
    let x = Math.round(pos.x);
    let y = Math.round(pos.y);
    let z = Math.round(pos.z);
    
    console.log("Starting position: " + x + ", " + y + ", " + z);
    
    const mins = getVoxelsMins(data.XYZI);
    for (const voxel of data.XYZI) {
        const xx = x + voxel.x - mins.x;
        const yy = y + voxel.z - mins.z;
        const zz = z + voxel.y - mins.y;

        const res = await UtopiaApi.placeBlock(inputs.blockType, xx, yy, zz);
        console.log(
            "Placed block at " + xx + ", " + yy + ", " + zz + ": " + res
        );
    }
}