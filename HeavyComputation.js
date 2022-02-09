console.log("Running HeavyComputation");

async function main() {
  console.log("Running HeavyComputation -> main");
  for (let i = 0; i < Inputs.i; i++) {
    for (let j = 0; j < Inputs.j; j++) {
      let a = i + j;
      let b = i * j;
      console.log(a + b);
    }
  }
}
