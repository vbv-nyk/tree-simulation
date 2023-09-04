import { useState } from "react";
import DispenserLogic from "../dispenserLogic";
import FormulaUsed from "../formulaUsed";

export default function StrongDispenser({
  dispensedNumbers,
  setDispensedNumbers,
}) {
  const formulas = [
    "let x = seed;",
    " x ^= x << 13;",
    "x ^= x >> 17;",
    " x ^= x << 5;",
  ];
  const [seed, setSeed] = useState(500);
  const range = 50;
  function resetGenerator() {
    setDispensedNumbers([]);
    setSeed(500);
  }

  function dispenseNumber() {
    let x = seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    setSeed(x);
    setDispensedNumbers([...dispensedNumbers, Math.abs(seed % 50)]);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">
          A Strong Random Number Dispenser
        </h2>
        <p>
          Following is how a single number is generated inside a Strong PRNG
        </p>
      </div>
      <FormulaUsed formulas={formulas} />
      <div class="flex gap-2">
        <button
          onClick={dispenseNumber}
          className="self-start px-3 py-1 font-bold text-white border rounded-md shadow-sm bg-slate-800"
        >
          Dispense
        </button>
        <button
          onClick={resetGenerator}
          className="self-start px-3 py-1 font-bold text-white border rounded-md shadow-sm bg-indigo-950"
        >
          Reset
        </button>
      </div>
      <DispenserLogic
        seed={seed}
        dispensedNumbers={dispensedNumbers}
        range={range}
      />
    </div>
  );
}
