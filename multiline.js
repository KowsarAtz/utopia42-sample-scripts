// const descriptor = {
//     inputs: [
//         {
//             label: "Source Block Type",
//             name: "sourceBlock",
//             type: "blockType",
//             hint: "Blocks of this type will turn into a random color block",
//             required: false,
//             isList: true,
//         },
//         {
//             label: "Source Block Type",
//             name: "sourceBlock1",
//             type: {
//                 inputs: [
//                     {
//                         label: "",
//                         name: "sourceBlock3",
//                         type: "blockType",
//                         hint: "Blocks of this type will turn into a random color block",
//                         required: false,
//                     },
//                     {
//                         label: "",
//                         name: "sourceBlock2",
//                         type: "blockType",
//                         hint: "Blocks of this type will turn into a random color block",
//                         required: false,
//                     },
//                 ],
//                 gridDescriptor: {
//                     rows: [["sourceBlock2", "sourceBlock3"]],
//                     templateColumns: "1fr 0.5fr",
//                 },
//             },
//             isList: true,
//             hint: "Blocks of this type will turn into a random color block",
//             required: true,
//         },
//     ],
//     gridDescriptor: {
//         rows: [["sourceBlock", "sourceBlock1"]],
//         templateColumns: "400px 600px",
//         templateRows: "300px",
//     },
// };

const descriptor = {
    inputs: [
        {
            label: "Starting Position",
            name: "startingPosition",
            type: "position",
            required: true
        },
        {
            label: "Horizontal Gap",
            name: "horizontalGap",
            type: "number",
            required: true
        },
        {
            label: "Vertical Gap",
            name: "verticalGap",
            type: "number",
            required: true
        },
        {
            label: "Rows Count",
            name: "rowsCount",
            type: "number",
            required: true
        },
        {
            label: "Columns Count",
            name: "columnsCount",
            type: "number",
            required: true
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
                        defaultValue: "0x8634666ba15ada4bbc83b9dbf285f73d9e46e4c2",
                    },
                    {
                        label: "Token ID",
                        name: "tokenId",
                        type: "text",
                        required: true,
                        defaultValue: "23309",
                    }
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
        rows: [["startingPosition"], ["horizontalGap", "verticalGap"], ["rowsCount", "columnsCount"], ["items", "items", "items"]],
        // templateColumns: "400px 600px",
        // templateRows: "100px 300px",
    },
};

async function main() {
    let inputs = await rxjs.firstValueFrom(UtopiaApi.getInputsFromUser(descriptor));
    console.log(JSON.stringify(inputs));
}
