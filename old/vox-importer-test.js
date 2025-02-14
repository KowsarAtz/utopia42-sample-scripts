const baseParams = [
    {
        label: "Parser Script URL",
        name: "parserUrl",
        type: "text",
        required: true,
        defaultValue:
            "https://cdn.jsdelivr.net/gh/Utopia42-club/plugins@1adc37a0d3c00d008856753e921419fe923f5701/vox-import/parser-lib.js",
    },
    {
        label: "Voxel File URL",
        name: "voxUrl",
        type: "text",
        required: true,
        defaultValue:
            "https://cdn.jsdelivr.net/gh/ephtracy/voxel-model@master/vox/monument/monu1.vox",
    },
    {
        label: "Starting Position",
        name: "startingPosition",
        type: "position",
        required: true,
    },
    {
        label: "Batch Size",
        name: "batchSize",
        type: "number",
        required: true,
    },
];

function getDetails(voxels) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    const uniqueColorIndices = [];

    for (const voxel of voxels) {
        minX = voxel.x < minX ? voxel.x : minX;
        minY = voxel.y < minY ? voxel.y : minY;
        minZ = voxel.z < minZ ? voxel.z : minZ;

        if (uniqueColorIndices.indexOf(voxel.c) == -1)
            uniqueColorIndices.push(voxel.c);
    }
    return {
        min: { x: minX, y: minY, z: minZ },
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

    const pos = inputs.startingPosition;
    let x = Math.round(pos.x);
    let y = Math.round(pos.y);
    let z = Math.round(pos.z);

    // const colors = data.RGBA;
    const details = getDetails(data.XYZI);

    // const middleExecutionInputs = [];
    // for (const index of details.uniqueColorIndices) {
    //     const color = colors[index];
    //     middleExecutionInputs.push({
    //         label: `<div style="width:20px; height:20px; background:rgba(${color.r},${color.g},${color.b},${color.a}); border:1px solid black;"></div>`,
    //         name: "bt" + index,
    //         type: "blockType",
    //         required: true,
    //     });
    // }
    // const blockTypeInputs = await UtopiaApi.getInputsFromUser(
    //     middleExecutionInputs
    // );

    const reqs = [];

    for (const voxel of data.XYZI) {
        const xx = x + voxel.x - details.min.x;
        const yy = y + voxel.z - details.min.z;
        const zz = z + voxel.y - details.min.y;

        reqs.push({
            type: "stone",
            position: {
                x: xx,
                y: yy,
                z: zz,
            },
        });
    }

    while (reqs.length > 0) {
        const res = await UtopiaApi.placeBlocks(reqs.splice(0, inputs.batchSize));
        const failed = [];
        let success = 0;
        for (const position of Object.keys(res)) {
            if (res[position]) success++;
            else failed.push(position);
        }
        console.log(
            `Placed ${success} out of ${Object.keys(res).length} blocks.`
        );
        if (failed.length > 0)
            console.warn(
                "Failed to place block at following positions",
                failed
            );
    }

    // const res = await UtopiaApi.placeBlocks(reqs);
    // const failed = [];
    // let success = 0;
    // for (const position of Object.keys(res)) {
    //     if (res[position]) success++;
    //     else failed.push(position);
    // }
    // console.log(`Placed ${success} out of ${Object.keys(res).length} blocks.`);
    // if (failed.length > 0)
    //     console.warn("Failed to place block at following positions", failed);
}
