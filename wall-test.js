const nftWallData = [
    {
        position: { x: 0, y: 32, z: 0 },
        type: { blockType: "#ffffff" }
    },
    {
        position: { x: 0, y: 33, z: 0 },
        type: { blockType: "#ffffff" }
    },
    {
        position: { x: 0, y: 34, z: 0 },
        type: {
            // blockType: "stone",
            metaBlock: {
                type: "image",
                properties: {
                    back: {
                        url: "https://lh3.googleusercontent.com/PmEaLtImJTLlgbJKgYenuMAo6e4UTM791ckWPx_zPixAEX6tDzcf5toRwYaRcXzY70W32JEgQjK14MFZZW16lZnbjEwHYN8kAI3GXQ=w600",
                        width: 2,
                        height: 2,
                    },
                },
            },
        },
    },
];

async function main() {
    console.log("building nft wall")
    const result = await rxjs.firstValueFrom(UtopiaApi.placeMetaBlocks(nftWallData));
    console.log("result", result);
}