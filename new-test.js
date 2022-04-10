// Base matrix : 1010,0101,1010

var baseInputs = [
    {
        label: "Base matrix",
        name: "matrix",
        type: "text",
        required: true,
    },
    {
        label: "height",
        name: "height",
        type: "number",
        required: true,
    },
    {
        label: "Start point",
        name: "zero",
        type: "position",
        required: true,
    },
    {
        label: "Block Type",
        name: "blockType",
        type: "blockType",
        required: true,
    },
];

function make2DMatrix(flattenMatrix) {
    flattenMatrix = flattenMatrix.replace(/\W*/gm, ``);
    var matrix2D = flattenMatrix.split(",");
    return matrix2D;
}

async function main() {
    console.log("Running Maze Builder");
    var Inputs = await rxjs.firstValueFrom(
        UtopiaApi.getInputsFromUser({ inputs: baseInputs })
    );
    var matrix = Inputs.matrix;
    var height = Inputs.height;
    var zero = {
        x: Math.floor(Inputs.zero.x),
        y: Math.floor(Inputs.zero.y),
        z: Math.floor(Inputs.zero.z),
    };

    var blockType = Inputs.blockType;
    var matrix2D = make2DMatrix(matrix);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < matrix2D.length; x++) {
            for (let z = 0; z < matrix2D[0].length; z++) {
                if (matrix2D[x][z] == "1") {
                    await rxjs.firstValueFrom(
                        UtopiaApi.placeBlock(
                            blockType,
                            zero.x + x,
                            zero.y + y,
                            zero.z + z
                        )
                    );
                }
            }
        }
    }
}
