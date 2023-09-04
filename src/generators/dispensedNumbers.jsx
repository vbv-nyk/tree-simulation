export default function DispensedNumbers({ dispensedNumbers }) {
  return (
    <div className="flex flex-col gap-1 text-xl">
      {dispensedNumbers.length > 0 && (
        <p className="font-bold">Dispensed Numbers</p>
      )}
      <div className="flex flex-wrap gap-1">
        {dispensedNumbers
          .map((dispensedNumber, i) => <div key={i}> {dispensedNumber} </div>)
          .reverse()}
      </div>
    </div>
  );
}
