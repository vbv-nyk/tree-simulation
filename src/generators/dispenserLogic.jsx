export default function DispenserLogic({
  seed,
  dispensedNumbers,
  range,
  caughtNumbers = [],
}) {
  return (
    <div className="flex flex-col gap-4 font-medium">
      {caughtNumbers.length > 0 && (
        <div className="flex flex-wrap gap-1">
          Caught Numbers:
          {caughtNumbers
            .map((caughtNumber, i) => <div key={i}>{caughtNumber}</div>)
            .reverse()}
        </div>
      )}
      <p>Current Seed Value: {seed} </p>
      <p>Current Range Value: {range} </p>
    </div>
  );
}
