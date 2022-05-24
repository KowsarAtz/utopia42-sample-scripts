a = {
    type: {
        blockType: "#ffffff",
        metaBlock: {
            type: "3d_object",
            properties:
                '{"url":"https://dweb.link/ipfs/Qmeix4Fqxyqy7XzNVfwJnS2txjLJDer1a6Ad722LjZxwbw"}',
        },
    },
};

async function main() {
    const res = await rxjs.firstValueFrom(UtopiaApi.previewBlocks([a]));
    console.log("preview done: ", res);
}
