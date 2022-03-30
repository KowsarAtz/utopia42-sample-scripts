const descriptor = {
    inputs: [
        {
            label: "Starting Position",
            name: "startingPosition",
            type: "position",
            required: true,
        },
        {
            label: "Wall Block Type",
            name: "wallBlockType",
            type: "blockType",
            required: true,
            defaultValue: "stone",
        },
        {
            label: "Image Width",
            name: "width",
            type: "number",
            required: true,
            defaultValue: 3,
        },
        {
            label: "Image Height",
            name: "height",
            type: "number",
            required: true,
            defaultValue: 3,
        },
        {
            label: "Horizontal Gap",
            name: "horizontalGap",
            type: "number",
            required: true,
            defaultValue: 2,
        },
        {
            label: "Vertical Gap",
            name: "verticalGap",
            type: "number",
            required: true,
            defaultValue: 1,
        },
        {
            label: "Rows Count",
            name: "rowsCount",
            type: "number",
            required: true,
            defaultValue: 2,
        },
        {
            label: "Columns Count",
            name: "columnsCount",
            type: "number",
            required: true,
            defaultValue: 4,
        },
        {
            label: "NFTs",
            name: "items",
            type: {
                inputs: [
                    {
                        label: "Collection Address",
                        name: "collection",
                        type: "text",
                        required: true,
                        defaultValue:
                            "0x8634666ba15ada4bbc83b9dbf285f73d9e46e4c2",
                    },
                    {
                        label: "Token ID",
                        name: "tokenId",
                        type: "number",
                        required: true,
                        defaultValue: "23309",
                    },
                ],
                gridDescriptor: {
                    rows: [["collection", "tokenId"]],
                },
            },
            isList: true,
            required: true,
        },
    ],
    gridDescriptor: {
        rows: [
            ["startingPosition", "wallBlockType"],
            ["horizontalGap", "verticalGap"],
            ["rowsCount", "columnsCount"],
            ["width", "height"],
            ["items", "items"],
        ],
    },
};

async function main() {
    const inputs = await rxjs.firstValueFrom(
        UtopiaApi.getInputsFromUser(descriptor)
    );

    const playerPosition = await rxjs.firstValueFrom(
        UtopiaApi.getPlayerPosition()
    );

    const startingPosition = {
        x: Math.floor(inputs.startingPosition.x),
        y: Math.floor(inputs.startingPosition.y),
        z: Math.floor(inputs.startingPosition.z),
    };

    const wallRelativeStartingPosition = {
        x: Math.floor(playerPosition.x) - startingPosition.x,
        y: Math.floor(playerPosition.y) - startingPosition.y,
        z: Math.floor(playerPosition.z) - startingPosition.z,
    };

    let side = "";
    const start = {
        x: startingPosition.x,
        y: startingPosition.y,
        z: startingPosition.z,
    };

    const wallWidth =
        (inputs.columnsCount + 1) * inputs.horizontalGap +
        inputs.columnsCount * inputs.width;
    const wallHeight =
        (inputs.rowsCount + 1) * inputs.verticalGap +
        inputs.rowsCount * inputs.height;

    let drawAlongX = true;

    if (
        Math.abs(wallRelativeStartingPosition.x) >=
        Math.abs(wallRelativeStartingPosition.z)
    ) {
        drawAlongX = false;
        if (wallRelativeStartingPosition.x >= 0) {
            side = "left";
            start.z = start.z - wallWidth;
        } else {
            side = "right";
        }
    } else {
        if (wallRelativeStartingPosition.z >= 0) {
            side = "back";
        } else {
            side = "front";
            start.x = start.x - wallWidth;
        }
    }

    const nftWallData = [];

    for (let y = wallHeight - 1; y > 0; y--)
        for (let w = 0; w < wallWidth; w++) {
            const pos = {
                x: start.x + (drawAlongX ? w : 0),
                z: start.z + (drawAlongX ? 0 : w),
                y: start.y + y,
            };

            const attachMeta =
                (drawAlongX
                    ? (w - inputs.horizontalGap) %
                          (inputs.horizontalGap + inputs.width) ==
                      0
                    : (w - inputs.horizontalGap) %
                          (inputs.horizontalGap + inputs.width) ==
                      0) &&
                (y - inputs.verticalGap) %
                    (inputs.verticalGap + inputs.height) ==
                    0;

            let metaBlock = null;
            if (attachMeta && inputs.items != null && inputs.items.length > 0) {
                metaBlock = {
                    type: "nft",
                    properties: {},
                };

                const nft = inputs.items.splice(0, 1)[0];
                metaBlock.properties[side] = {
                    collection: nft.collection,
                    tokenId: nft.tokenId.toString(),
                    width: inputs.width,
                    height: inputs.height,
                };
            }

            nftWallData.push({
                position: pos,
                type: {
                    blockType: inputs.wallBlockType,
                    metaBlock: metaBlock,
                },
            });
        }
    const result = await rxjs.firstValueFrom(
        UtopiaApi.placeBlocks(nftWallData)
    );
    console.log(JSON.stringify(result));
}
