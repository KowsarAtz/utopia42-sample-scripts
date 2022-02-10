async function main() {
  console.log("Running CageBuilder");

  let pos = Inputs.playerPosition;

  let x = Math.round(pos.x);
  let y = Math.round(pos.y);
  let z = Math.round(pos.z);

  console.log("Player position rounded: " + x + ", " + y + ", " + z);

  for (let zz = z - 1; zz <= z + 1; zz = zz + 2) {
    for (let xx = x - 1; xx <= x + 1; xx = xx + 2) {
      for (let yy = x; yy <= x + Inputs.height; yy++) {
        console.log("Placing block at: " + yy + ", " + xx + ", " + zz);
        UtopiaApi.placeBlock(Inputs.blockType, yy, xx, zz);
      }
    }
  }
}
