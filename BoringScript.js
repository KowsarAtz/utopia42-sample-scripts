console.log("Running Boring Script");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (let i = 0; i < Inputs.time; i++) {
  console.log("Sleeping... " + i);
  await sleep(1000);
}
