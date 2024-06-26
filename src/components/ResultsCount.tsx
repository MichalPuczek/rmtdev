import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNrOfResults } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalNrOfResults} </span>
      {`offre${totalNrOfResults > 1 ? "s" : ""}`}
    </p>
  );
}
