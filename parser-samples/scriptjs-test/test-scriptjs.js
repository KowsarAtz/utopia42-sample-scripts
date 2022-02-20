importScripts("https://cdn.jsdelivr.net/gh/KowsarAtz/utopia42-sample-scripts@main/parser-samples/scriptjs-test/data%20copy%202.js");

async function main(){
    try{
        self.exportedFunction()
    }
    catch(e){
    }

    try{
        self.unExportedFunction()
    }
    catch(e){
    }
}