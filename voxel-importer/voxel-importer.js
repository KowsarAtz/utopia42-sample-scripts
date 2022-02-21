const baseParams = [
    {
        label: "Parser Script URL",
        name: "parserUrl",
        type: "text",
        required: true,
        defaultValue:
            "https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@69c23508f1611b46077f0f784c76be009df403ee/voxel-importer/parser-lib.js",
    },
    {
        label: "Voxel File URL",
        name: "voxUrl",
        type: "text",
        required: true,
        defaultValue:
            "https://cdn.jsdelivr.net/gh/ephtracy/voxel-model@master/vox/character/chr_sword.vox",
    },
    {
        label: "Starting Position",
        name: "startingPosition",
        type: "position",
        required: true,
    },
    {
        label: "Voxel Model Bounds Limit",
        name: "boundsLimit",
        type: "number",
        required: true,
        defaultValue: 40,
    },
];

function getDetails(voxels) {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    const uniqueColorIndices = [];

    for (const voxel of voxels) {
        minX = voxel.x < minX ? voxel.x : minX;
        minY = voxel.y < minY ? voxel.y : minY;
        minZ = voxel.z < minZ ? voxel.z : minZ;

        maxX = voxel.x > maxX ? voxel.x : maxX;
        maxY = voxel.y > maxY ? voxel.y : maxY;
        maxZ = voxel.z > maxZ ? voxel.z : maxZ;

        if (uniqueColorIndices.indexOf(voxel.c) == -1)
            uniqueColorIndices.push(voxel.c);
    }
    return {
        min: { x: minX, y: minY, z: minZ },
        max: { x: maxX, y: maxY, z: maxZ },
        uniqueColorIndices: uniqueColorIndices,
    };
}

async function main() {
    const inputs = await UtopiaApi.getInputsFromUser(baseParams);
    importScripts(inputs.parserUrl);
    const buffer = await (
        await fetch(new Request(inputs.voxUrl))
    ).arrayBuffer();
    const data = vox.parseMagicaVoxel(buffer);
    const colors = data.RGBA;

    const pos = inputs.startingPosition;
    let x = Math.round(pos.x);
    let y = Math.round(pos.y);
    let z = Math.round(pos.z);

    const details = getDetails(data.XYZI);
    const limit = inputs.boundsLimit;

    const dx = details.max.x - details.min.x;
    const dy = details.max.y - details.min.y;
    const dz = details.max.z - details.min.z;
    const maxBound = Math.max(dx, dy, dz);

    if (maxBound > limit) {
        console.error(
            "Model size exceeds allowed details, max bound:",
            maxBound
        );
        return;
    }

    // handle colors
    const middleExecutionInputs = [];
    for (const index of details.uniqueColorIndices) {
        const color = colors[index];
        middleExecutionInputs.push({
            label: `<div style="width:20px; height:20px; background:rgba(${color.r},${color.g},${color.b},${color.a}); border:1px solid black;"></div>`,
            name: "bt" + index,
            type: "blockType",
            required: true,
        });
    }
    const blockTypeInputs = await UtopiaApi.getInputsFromUser(
        middleExecutionInputs
    );

    for (const voxel of data.XYZI) {
        const xx = x + voxel.x - details.min.x;
        const yy = y + voxel.z - details.min.z;
        const zz = z + voxel.y - details.min.y;

        try {
            const res = await UtopiaApi.placeBlock(
                blockTypeInputs["bt" + voxel.c],
                xx,
                yy,
                zz
            );
            console.log(
                "Placed block at " + xx + ", " + yy + ", " + zz + ": " + res
            );
        } catch (e) {
            console.error(
                "Place block failed at " + xx + ", " + yy + ", " + zz + ": " + e
            );
        }
    }
}
