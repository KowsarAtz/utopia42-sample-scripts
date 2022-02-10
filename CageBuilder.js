async function main() {
  console.log("Running CageBuilder");

  let pos = Inputs.playerPosition;

  let x = Math.round(pos.x);
  let y = Math.round(pos.y);
  let z = Math.round(pos.z);

  console.log("Player position rounded: " + x + ", " + y + ", " + z);

  for (let zz = z - 1; zz <= z + 1; zz + 2) {
    for (let yy = y - 1; y <= y + 1; yy + 2) {
      for (let xx = x; xx <= x + Inputs.height; xx++) {
        console.log("Placing block at: " + xx + ", " + yy + ", " + zz);
        UtopiaApi.placeBlock(Inputs.blockType, xx, yy, zz);
      }
    }
  }
}
