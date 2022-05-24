async function main() {
	```ts
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
                            width: 2, height: 2,
                            marketUrl: "https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/4671",
                        },
                    },
                },
            },
        },
    ]
    let result = await rxjs.firstValueFrom(UtopiaApi.placeBlocks(nftWallData));
    // result --> result {(-3066, 32, -860): true, (-3066, 33, -860): true, (-3066, 34, -860): true}
	```
}


