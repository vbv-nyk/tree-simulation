export default function FormulaUsed({ formulas }) {
  const formulasContainer = formulas.map((formula, i) => (
    <span
      key={i}
      className="self-start px-4 py-2 font-bold text-white bg-opacity-100"
      style={{
        backgroundColor:
          i === 0
            ? "rgb(71 85 105)"
            : i === 1
            ? "rgb(51 65 85)"
            : i === 2
            ? "rgb(30 41 59)"
            : "rgb(15 23 42)",
      }}
    >
      {formula}
    </span>
  ));

  return (
    <div className="flex flex-col gap-2 font-medium ">
      Formula Used:
      <div className="flex flex-wrap">{formulasContainer}</div>
    </div>
  );
}
