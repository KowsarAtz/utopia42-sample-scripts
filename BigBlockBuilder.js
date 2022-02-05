console.log("Running BigBlockBuilder");
console.log(Inputs);

var x = Inputs.x;
var y = Inputs.y;
var z = Inputs.z;

for (let i = 0; i < Inputs.a; i++) {
  for (let j = 0; j < Inputs.b; j++) {
    for (let k = 0; k < Inputs.c; k++) {
      UtopiaApi.placeBlock(Inputs.type, x + i, y + j, z + k);
    }
  }
}
