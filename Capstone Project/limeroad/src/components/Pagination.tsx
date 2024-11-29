import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPaginationRange = (): (number | string)[] => {
    const range: (number | string)[] = [];
    const delta = 5; // How many pages to show around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-100"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {paginationRange.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            className={`px-4 py-2 border rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-100"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-2 py-2 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-100"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
