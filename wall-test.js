const nftWallData = [
    {
        position: { x: -3066, y: 32, z: -860 },
        type: { blockType: "#ffffff" }
    },
    {
        position: { x: -3066, y: 33, z: -860 },
        type: { blockType: "#ffffff" }
    },
    {
        position: { x: -3066, y: 34, z: -860 },
        type: {
            blockType: "stone",
            metaBlock: {
                type: "nft",
                properties: {
                    back: {
                        url: "https://ipfs.io/ipfs/Qmci1pGaUmvb6StPxdGp1WqfK9QjPjdf43nCbY5LJ9y1MY",
                        width: 2,
                        height: 2,
                        marketUrl: "https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/4671",
                    },
                },
            },
        },
    },
];

async function main() {
    console.log("building nft wall")
    const result = await rxjs.firstValueFrom(UtopiaApi.placeBlocks(nftWallData));
    console.log("result", result);
}