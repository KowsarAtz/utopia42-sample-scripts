async function main(){
    importScripts("https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@main/parser-samples/scriptjs-test/bundle.js");
    var myRequest = new Request('https://github.com/KowsarAtz/utopia42-sample-scripts/blob/b038e4473faccc677f68ab5f9703d6a1ee989b86/parser-samples/castle.vox');
    const buffer = await (await fetch(myRequest)).arrayBuffer();
    const vx = vox.parseMagicaVoxel(buffer);

    const pos = await UtopiaApi.getPlayerPosition();

    let x = Math.round(pos.x);
    let y = Math.round(pos.y) + 3;
    let z = Math.round(pos.z);

    console.log("Starting position: " + pos.x + ", " + pos.y + ", " + pos.z);

    for (const blockPos of vx.XYZI) {
        const xx = x + blockPos.x;
        const yy = y + blockPos.z;
        const zz = z + blockPos.y;

        const res = await UtopiaApi.placeBlock(Inputs.blockType, xx, yy, zz);
        console.log(
            "Placed block at " + xx + ", " + yy + ", " + zz + ": " + res
        );
    }
}