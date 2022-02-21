const baseParams = [
    {
        label: "Block Type",
        name: "blockType",
        type: "blockType",
        required: true,
    },
    {
        label: "Starting Position",
        name: "startingPosition",
        type: "position",
        required: true,
    },
    {
        label: "Parser Script URL",
        name: "parserUrl",
        type: "text",
        required: true,
    },
    {
        label: "Voxel File URL",
        name: "voxUrl",
        type: "text",
        required: true,
    },
    {
        label: "Voxel Model Bounds Limit",
        name: "boundsLimit",
        type: "number",
        required: true,
    },
];

function getBounds(voxels) {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    for (const voxel of voxels) {
        minX = voxel.x < minX ? voxel.x : minX;
        minY = voxel.y < minY ? voxel.y : minY;
        minZ = voxel.z < minZ ? voxel.z : minZ;

        maxX = voxel.x > maxX ? voxel.x : maxX;
        maxY = voxel.y > maxY ? voxel.y : maxY;
        maxZ = voxel.z > maxZ ? voxel.z : maxZ;
    }
    return {
        min: { x: minX, y: minY, z: minZ },
        max: { x: maxX, y: maxY, z: maxZ },
    };
}

async function main() {
    const inputs = await UtopiaApi.getInputsFromUser(baseParams);
    importScripts(inputs.parserUrl);
    const buffer = await (
        await fetch(new Request(inputs.voxUrl))
    ).arrayBuffer();
    const data = vox.parseMagicaVoxel(buffer);

    const pos = inputs.startingPosition;
    let x = Math.round(pos.x);
    let y = Math.round(pos.y);
    let z = Math.round(pos.z);

    const bounds = getBounds(data.XYZI);
    const limit = inputs.boundsLimit;

    const dx = bounds.max.x - bounds.min.x;
    const dy = bounds.max.y - bounds.min.y;
    const dz = bounds.max.z - bounds.min.z;
    const maxBound = Math.max(dx, dy, dz);

    if (maxBound > limit) {
        console.error(
            "Model size exceeds allowed bounds, max bound:",
            maxBound
        );
        return;
    }

    for (const voxel of data.XYZI) {
        const xx = x + voxel.x - bounds.min.x;
        const yy = y + voxel.z - bounds.min.z;
        const zz = z + voxel.y - bounds.min.y;

        const res = await UtopiaApi.placeBlock(inputs.blockType, xx, yy, zz);
        console.log(
            "Placed block at " + xx + ", " + yy + ", " + zz + ": " + res
        );
    }
}
