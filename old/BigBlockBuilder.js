console.log("Running BigBlockBuilder");

async function main() {
  var x = Inputs.position.x;
  var y = Inputs.position.y;
  var z = Inputs.position.z;
  for (let i = 0; i < Inputs.a; i++) {
    for (let j = 0; j < Inputs.b; j++) {
      for (let k = 0; k < Inputs.c; k++) {
        try {
          let res = await UtopiaApi.placeBlock(Inputs.blockType, x + i, y + j, z + k);
          console.log(res);
        } catch(e) {
            console.log(e);
        }
      }
    }
  }
}
