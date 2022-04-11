const descriptor = {
    inputs: [
        {
            label: "Wall First Corner",
            name: "firstCorner",
            type: "position",
            required: true,
        },
        {
            label: "Wall Second Corner",
            name: "secondCorner",
            type: "position",
            required: true,
        },
        {
            label: "Create Wall",
            name: "createWall",
            type: "selection",
            defaultValue: "yes",
            required: true,
            options: [
                { key: "yes", value: "yes" },
                { key: "no", value: "no" },
            ],
            hint: "<span><s>If no, script will only try to attach images to an existing wall</s></span>",
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
                            "0xdc0479cc5bba033b3e7de9f178607150b3abce1f",
                    },
                    {
                        label: "Token ID",
                        name: "tokenId",
                        type: "number",
                        required: true,
                        defaultValue: "3380",
                    },
                ],
                gridDescriptor: {
                    rows: [["collection"], ["tokenId"]],
                },
            },
            isList: true,
            required: true,
        },
    ],
    gridDescriptor: {
        rows: [
            ["firstCorner", "secondCorner", "items", "items"],
            ["createWall", "wallBlockType", "items", "items"],
            ["horizontalGap", "verticalGap", "items", "items"],
            ["rowsCount", "columnsCount", "items", "items"],
            ["width", "height", "items", "items"],
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

    const firstCorner = {
        x: Math.floor(inputs.firstCorner.x),
        y: Math.floor(inputs.firstCorner.y),
        z: Math.floor(inputs.firstCorner.z),
    };

    const secondCorner = {
        x: Math.floor(inputs.secondCorner.x),
        y: Math.floor(inputs.secondCorner.y),
        z: Math.floor(inputs.secondCorner.z),
    };

    if (firstCorner.x != secondCorner.x && firstCorner.z != secondCorner.z)
        throw new Error("Invalid wall corners");

    const drawAlongX = firstCorner.x != secondCorner.x;

    const wallWidth = drawAlongX
        ? Math.abs(firstCorner.x - secondCorner.x)
        : Math.abs(firstCorner.z - secondCorner.z);
    const wallHeight = Math.abs(firstCorner.y - secondCorner.y);

    const startingPosition = {
        x: drawAlongX
            ? firstCorner.z >= 0
                ? Math.min(firstCorner.x, secondCorner.x)
                : Math.max(firstCorner.x, secondCorner.x)
            : firstCorner.x,
        y: Math.min(firstCorner.y, secondCorner.y),
        z: !drawAlongX
            ? firstCorner.x >= 0
                ? Math.max(firstCorner.z, secondCorner.z)
                : Math.min(firstCorner.z, secondCorner.z)
            : firstCorner.z,
    };

    const wallRelativeStartingPosition = {
        x: startingPosition.x - Math.floor(playerPosition.x),
        y: startingPosition.y - Math.floor(playerPosition.y),
        z: startingPosition.z - Math.floor(playerPosition.z),
    };

    const incrementor = (w, y) => {
        return {
            x:
                startingPosition.x +
                (drawAlongX ? w : 0) *
                    (wallRelativeStartingPosition.z >= 0 ? 1 : -1),
            z:
                startingPosition.z +
                (drawAlongX ? 0 : w) *
                    (wallRelativeStartingPosition.x >= 0 ? -1 : 1),
            y: startingPosition.y + y,
        };
    };

    const isMetaCandidate = (w, y) => {
        if (
            (y - inputs.verticalGap) % (inputs.verticalGap + inputs.height) !=
            0
        )
            return false;
        if (
            (drawAlongX && wallRelativeStartingPosition.z >= 0) ||
            (!drawAlongX && wallRelativeStartingPosition.x < 0)
        )
            return (
                (w - inputs.horizontalGap) %
                    (inputs.horizontalGap + inputs.width) ==
                0
            );
        return (w + 1) % (inputs.horizontalGap + inputs.width) == 0;
    };

    // const isWallPosition = (pos) => {
    //     if (
    //         (pos.y < firstCorner.y && pos.y > secondCorner.y) ||
    //         (pos.y > firstCorner.y && pos.y < secondCorner.y)
    //     )
    //         return false;

    //     if (
    //         drawAlongX &&
    //         ((pos.x < firstCorner.x && pos.x > secondCorner.x) ||
    //             (pos.x > firstCorner.x && pos.x < secondCorner.x))
    //     ) {
    //         return false;
    //     }
    //     if (
    //         (pos.z < firstCorner.z && pos.z > secondCorner.z) ||
    //         (pos.z > firstCorner.z && pos.z < secondCorner.z)
    //     )
    //         return false;
    //     return true;
    // };

    const side = drawAlongX
        ? wallRelativeStartingPosition.z >= 0
            ? "back"
            : "front"
        : wallRelativeStartingPosition.x >= 0
        ? "left"
        : "right";

    const nftWallData = [];

    for (let y = wallHeight - 1; y >= 0; y--)
        for (let w = 0; w < wallWidth; w++) {
            const pos = incrementor(w, y);

            let metaBlock = null;
            if (
                isMetaCandidate(w, y) &&
                inputs.items != null &&
                inputs.items.length > 0
            ) {
                metaBlock = {
                    type: "nft",
                    properties: {},
                };

                const nft = inputs.items.splice(0, 1)[0];
                metaBlock.properties[side] = {
                    collection: nft.collection,
                    tokenId: nft.tokenId,
                    width: inputs.width,
                    height: inputs.height,
                };
            }

            nftWallData.push({
                position: pos,
                type: {
                    blockType:
                        inputs.createWall == "yes"
                            ? inputs.wallBlockType
                            : null,
                    metaBlock: metaBlock,
                },
            });
        }

    const result = await rxjs.firstValueFrom(
        UtopiaApi.placeBlocks(nftWallData)
    );
    console.log(JSON.stringify(result));

    if (inputs.items.length > 0) {
        console.warn(
            "Could not place all images. Choose wall corners carefully"
        );
    }
}
