import { useState } from "react";
import DispenserLogic from "../dispenserLogic";
import FormulaUsed from "../formulaUsed";

export default function WeakGenerator({
  title,
  description,
  dispensedNumbers,
  setDispensedNumbers,
  delay,
}) {
  const formulas = ["((seed * 9301 + 49297) % 233280) % 2 + 1"];
  const [seed, setSeed] = useState(500);
  const [caughtNumbers, setCaughtNumbers] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generatorInterval, setGeneratorInterval] = useState(null);
  const range = 5;

  const startGeneration = () => {
    if (generating) {
      setGenerating(false);
      clearInterval(generatorInterval);
    } else {
      setGenerating(true);
      setGeneratorInterval(
        setInterval(() => {
          setSeed((prevSeed) => {
            const newSeed = (prevSeed * 9301 + 49297) % 233280;
            setDispensedNumbers((prevNumbers) => [
              ...prevNumbers,
              newSeed % range,
            ]);
            return newSeed;
          });
        }, delay)
      );
    }
  };

  function catchNumber() {
    if (!generating) return;
    setCaughtNumbers([
      ...caughtNumbers,
      dispensedNumbers[dispensedNumbers.length - 1],
    ]);
  }

  function resetGenerator() {
    setDispensedNumbers([]);
    setCaughtNumbers([]);
    setSeed(500);
    clearInterval(generatorInterval);
    setGenerating(false);
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <FormulaUsed formulas={formulas} />

        <div className="flex gap-1">
          <button
            onClick={startGeneration}
            className="self-start px-3 py-1 font-bold text-white border rounded-md shadow-sm bg-slate-900"
          >
            {generating ? "Stop Generating" : "Generate"}
          </button>
          <button
            onClick={catchNumber}
            className="self-start px-3 py-1 font-bold text-white border rounded-md shadow-sm bg-indigo-950"
          >
            Catch
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
        caughtNumbers={caughtNumbers}
        dispensedNumbers={dispensedNumbers}
        range={range}
      />
    </div>
  );
}
