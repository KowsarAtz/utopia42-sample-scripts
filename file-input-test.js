const baseParams = [
    {
        label: "Voxel File",
        name: "voxFile",
        type: "file",
    }
];


async function main() {
    const inputs = await rxjs.firstValueFrom(UtopiaApi.getInputsFromUser({inputs: baseParams}));
    console.log(inputs.voxFile);
    console.log(inputs.voxFile._files[0]);
}
