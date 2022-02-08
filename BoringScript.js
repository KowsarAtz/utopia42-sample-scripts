console.log("Running Boring Script");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

sleep(Inputs.time);

for (let i = 0; i < Inputs.time; i++) {
  console.log("Sleeping... " + i);
  sleep(1000);
}
