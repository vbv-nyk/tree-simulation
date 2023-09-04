import { useState } from "react";
import DispenserLogic from "../dispenserLogic";
import FormulaUsed from "../formulaUsed";

export default function WeakDispenser({
  dispensedNumbers,
  setDispensedNumbers,
}) {
  const formulas = ["((seed * 9301 + 49297) % 233280) % 2 + 1"];
  const [seed, setSeed] = useState(500);
  const range = 50;

  function dispenseNumber() {
    setSeed(((seed * 9301 + 49297) % 233280) + 1);
    setDispensedNumbers([...dispensedNumbers, seed % 50]);
  }
  function resetGenerator() {
    setDispensedNumbers([]);
    setSeed(500);
  }

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">
          A Weak Random Number Dispenser
        </h2>
        <p>Following is how a single number is generated inside a Weak PRNG</p>
      </div>
      <div className="flex flex-col gap-2">
        <FormulaUsed formulas={formulas} />
        <div className="flex gap-2">
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
      </div>
      <DispenserLogic
        seed={seed}
        dispensedNumbers={dispensedNumbers}
        range={range}
      />
    </div>
  );
}
