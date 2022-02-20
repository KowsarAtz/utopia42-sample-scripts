async function main(){
    // importScripts("https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@main/parser-samples/scriptjs-test/parse-magica-voxel.js")
    //     .then(() => {
    //         console.log("exports", self.module.exports)
    //     })
    //     .catch((e) => console.error("could not load lib:", e));

    importScripts("https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@main/parser-samples/scriptjs-test/data%20copy%203.js")
        .then(() => {
            self.unExportedFunction()
        })
        .catch((e) => console.error("could not load sample:", e));
}