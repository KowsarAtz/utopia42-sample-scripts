async function main() {
  console.log("Running CageBuilder");

  let pos = await UtopiaApi.getPlayerPosition();

  let x = Math.round(pos.x);
  let y = Math.round(pos.y);
  let z = Math.round(pos.z);

  console.log("Player position: " + pos.x + ", " + pos.y + ", " + pos.z);

  for (let zz = z - 1; zz <= z + 1; zz++) {
    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y; yy <= y + Inputs.height; yy++) {
        if (x != xx || y != yy || z != zz) {
          let res = await UtopiaApi.placeBlock(Inputs.blockType, xx, yy, zz);
          console.log(
            "Placed block at " + xx + ", " + yy + ", " + zz + ": " + res
          );
        }
      }
    }
  }
}
