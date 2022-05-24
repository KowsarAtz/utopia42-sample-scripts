async function main() {
  console.log("Running MegaScript");
  console.log("Inputs", Inputs);
  let playerPos = await UtopiaApi.getPlayerPosition();
  console.log("Player Position", playerPos);
  let wallet = await UtopiaApi.getCurrentWallet();
  console.log("Player Wallet Id", wallet);
  let playerLands = await UtopiaApi.getPlayerLands(wallet);
  console.log("Player Lands", playerLands);
  let markers = await UtopiaApi.getMarkers();
  console.log("Markers", markers);
  let pb1 = await UtopiaApi.placeBlock("grass", playerPos.x, playerPos.y, playerPos.z);
  console.log("Placed Block at player positions?", pb1);
  let pb2 = await UtopiaApi.placeBlock("grass", playerPos.x + 2, playerPos.y + 2, playerPos.z + 2);
  console.log("Placed Block somewhere else?", pb2);
}
