$script.get(
    "https://raw.githubusercontent.com/KowsarAtz/utopia42-sample-scripts/main/parser-samples/scriptjs-test/data.js",
    () => {
        console.log("script loaded");
        console.log("sample", sample);
    }
);
