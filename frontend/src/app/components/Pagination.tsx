import IPagination from "@/app/interfaces/IPaginationProps";
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }: IPagination) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            console.log("Previous page clicked", currentPage - 1);

        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            console.log("Next page clicked", currentPage + 1);
        }
    };
    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    }
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            // Show all pages if total pages are less than or equal to maxVisibleButtons
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            // Always show the first and last page
            buttons.push(1);

            // Add ellipsis if currentPage is far from the first page
            if (currentPage > 3) {
                buttons.push("...");
            }

            // Add pages around the current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(i);
            }

            // Add ellipsis if currentPage is far from the last page
            if (currentPage < totalPages - 2) {
                buttons.push("...");
            }

            // Add the last page
            buttons.push(totalPages);
        }

        return buttons;
    };

    const paginationButtons = getPaginationButtons();
    return (
        <>
            {/* Pagination Wrapper */}
            <div className="grid justify-center sm:flex sm:justify-center sm:items-center gap-2 mt-10">
                {/* Pagination Info */}
                <div className="text-sm text-gray-600 ">
                    Tổng sản phẩm: <span className="font-bold">{totalItems}</span>
                </div>
                {/* Pagination */}
                <nav className="flex justify-end items-center -space-x-px" aria-label="Pagination">
                    {/* Previous Button */}
                    <button
                        type="button"
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Previous"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </button>

                    {/* Dynamic Pagination Buttons */}
                    {paginationButtons.map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                type="button"
                                className={`min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden ${page === currentPage
                                    ? "bg-gray-200 text-gray-800 focus:bg-gray-300"
                                    : "text-gray-800 hover:bg-gray-100"
                                    } disabled:opacity-50 disabled:pointer-events-none`}
                                aria-current={page === currentPage ? "page" : undefined}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </button>
                        ) : (
                            <span
                                key={index}
                                className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 py-2 px-3 text-sm text-gray-400"
                            >
                                ...
                            </span>
                        )
                    )}

                    {/* Next Button */}
                    <button
                        type="button"
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Next"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </nav>
                {/* End Pagination */}


            </div>
        </>
    );
};
export default Pagination;