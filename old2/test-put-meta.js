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
    const inputs = await rxjs.firstValueFrom(
        UtopiaApi.getInputsFromUser({
            inputs: [
                {
                    label: "Starting Position",
                    name: "startingPosition",
                    type: "position",
                    required: true,
                },
            ],
        })
    );
    a.position = inputs.startingPosition;
    const res = await rxjs.firstValueFrom(UtopiaApi.previewBlocks([a]));
    console.log("preview done: ", res);
}
