import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@/components/pagination";

function generatePageNumbers(currentPage: number, totalPages: number) {
  const start = [1,2,3];
  const afterStart = [4,5,6];
  const end = [totalPages-2, totalPages-1, totalPages];
  const beforeEnd = [totalPages-5, totalPages-4, totalPages-3];
  const middle = [currentPage-1, currentPage, currentPage+1];
  const all = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 9) {
    return all;
  }
  if (currentPage <= 4) {
    return [...start, null, ...afterStart, null, ...end];
  }
  if (currentPage >= totalPages - 4) {
    return [...start, null, ...beforeEnd, null, ...end];
  }
  return [...start, null, ...middle, null, ...end];
}

export default function TablePagination({
  stateLength,
  page,
  itemsPerPage,
}: {
  stateLength: number;
  page: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(stateLength / itemsPerPage);
  const pageNumbers = generatePageNumbers(page, totalPages);

  return (
    <Pagination>
      <PaginationPrevious href={page === 1 ? null : `?page=${page - 1}`} />
      <PaginationList>
        {pageNumbers.map((pageNumber, i) => {
          if (pageNumber) {
            return (
              <PaginationPage
                key={i}
                href={`?page=${pageNumber}`}
                current={pageNumber === page}
              >
                {`${pageNumber}`}
              </PaginationPage>
            );
          } else {
            return <PaginationGap key={i} />;
          }
        })}
      </PaginationList>
      <PaginationNext
        href={stateLength <= page * itemsPerPage ? null : `?page=${page + 1}`}
      />
    </Pagination>
  );
}