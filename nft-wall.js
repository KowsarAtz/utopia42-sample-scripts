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
            defaultValue: "stone"
        },
        {
            label: "Image Width",
            name: "width",
            type: "number",
            required: true,
            defaultValue: 3
        },
        {
            label: "Image Height",
            name: "height",
            type: "number",
            required: true,
            defaultValue: 3
        },
        {
            label: "Horizontal Gap",
            name: "horizontalGap",
            type: "number",
            required: true,
            defaultValue: 2
        },
        {
            label: "Vertical Gap",
            name: "verticalGap",
            type: "number",
            required: true,
            defaultValue: 1
        },
        {
            label: "Rows Count",
            name: "rowsCount",
            type: "number",
            required: true,
            defaultValue: 2
        },
        {
            label: "Columns Count",
            name: "columnsCount",
            type: "number",
            required: true,
            defaultValue: 4
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
                        type: "text",
                        required: true,
                        defaultValue: "23309",
                    },
                ],
                gridDescriptor: {
                    rows: [["collection", "collection", "tokenId"]],
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
    const inputs = await rxjs.firstValueFrom(UtopiaApi.getInputsFromUser(descriptor));



    console.log(JSON.stringify(inputs));
}
