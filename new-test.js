// Base matrix : 1010,0101,1010

var baseInputs = [
  {
    label: "Base matrix",
    name: "matrix",
    type: "text",
    required: true,
  },
  {
    label: "Hieght",
    name: "hieght",
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

function make2DMatrix(flattenMatrix){
  flattenMatrix = flattenMatrix.replaceAll(' ','');
  var matrix2D = flattenMatrix.split(',');
  return matrix2D;
}



async function main() {
  console.log("Running Cube Builder");
  var Inputs = await rxjs.firstValueFrom(UtopiaApi.getInputsFromUser({inputs: baseInputs}));
  var matrix = Inputs.matrix;
  var hieght = Inputs.hieght;
  var zero = Inputs.zero;
  var blockType = Inputs.blockType;
  console.log("yseee");
  console.log(hieght);
  var matrix2D = make2DMatrix(matrix);
  for(let y = zero.y;y<zero.y+hieght;y++){
    console.log(y)
    for(let x = zero.x;x<zero.x+matrix2D.length;x++){
      console.log("mmm")
      for(let z = zero.z;z<zero.z+matrix2D[x - zero.x].length;z++){
        if(matrix2D[x][z] == "1"){
          await rxjs.firstValueFrom(UtopiaApi.placeBlock(blockType, x, y, z));
          console.log("block")
          console.log(x);
          console.log(y);
          console.log(z);
        }
      }
    }
  }
  

}
