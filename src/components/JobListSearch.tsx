import { useJobItemsContext } from "../lib/hooks";
// Components
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
