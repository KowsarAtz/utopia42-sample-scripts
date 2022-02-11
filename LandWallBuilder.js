console.log("Running LandWallBuilder");

async function main() {
  let land = Inputs.land;

  for (let i = land.x1; i < land.x2; i++) {
    for (let j = Inputs.startingHeight; i < Inputs.height; j++) {
      console.log("Placing block at: " + i + ", " + land.y1 + ", " + j);
      UtopiaApi.placeBlock(Inputs.blockType, i, j, land.y1);
    }
  }
  for (let i = land.x1; i < land.x2; i++) {
    for (let j = Inputs.startingHeight; i < Inputs.height; j++) {
      UtopiaApi.placeBlock(Inputs.blockType, i, j, land.y2);
    }
  }
  for (let i = land.y1; i < land.y2; i++) {
    for (let j = Inputs.startingHeight; i < Inputs.height; j++) {
      UtopiaApi.placeBlock(Inputs.blockType, land.x1, j, i);
    }
  }
  for (let i = land.y1; i < land.y2; i++) {
    for (let j = Inputs.startingHeight; i < Inputs.height; j++) {
      UtopiaApi.placeBlock(Inputs.blockType, land.x2, j, i);
    }
  }
}
