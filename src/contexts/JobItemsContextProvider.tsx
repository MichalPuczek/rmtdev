import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { TSortBy, TPageDirection, TJobItem } from "../lib/types";

type JobItemsContext = {
  jobItems: TJobItem[] | undefined;
  jobItemsSortedAndSliced: TJobItem[];
  isLoading: boolean;
  totalNrOfResults: number;
  totalNrOfPages: number;
  currentPage: number;
  sortBy: TSortBy;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

// Create new context
export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dependency on other context
  const { debouncedSearchText } = useSearchTextContext();
  // STATE
  // -- 1 : current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // -- 2 : selected option for sorting
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  // Query for job items
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);

  // DERIVED / COMPUTED STATE
  // -- sorted job items
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );
  // -- 7 first results of sorted job items
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );
  // -- total nr of job items
  const totalNrOfResults = jobItems?.length || 0;
  // -- total nr of pages
  const totalNrOfPages = totalNrOfResults / RESULTS_PER_PAGE;

  // EVENT HANDLERS / ACTIONS
  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);
  const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNrOfResults,
      totalNrOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNrOfResults,
      totalNrOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
