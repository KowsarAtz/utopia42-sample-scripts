console.log("Running CageBuilder");

let pos = Inputs.playerPosition;
console.log("Player position: " + pos);

let x = Math.round(pos.x);
let y = Math.round(pos.y);
let z = Math.round(pos.z);

for (let zz = z - 1; zz <= z + 1; zz + 2) {
  for (let yy = y - 1; y <= y + 1; yy + 2) {
    for (let xx = x; x <= x + Inputs.height; xx++) {
      UtopiaApi.placeBlock(Inputs.blockType, xx, yy, zz);
    }
  }
}
