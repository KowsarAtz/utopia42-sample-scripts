var fs = require('fs');
var parseMagicaVoxel = require("parse-magica-voxel");

fs.readFile(__dirname+ "/castle.vox", (err, buffer) => {
  if (err) throw err;
  console.log(JSON.stringify(parseMagicaVoxel(buffer), null, 2));
});