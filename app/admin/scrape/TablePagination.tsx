import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@components/pagination";

function generatePageNumbers(currentPage: number, totalPages: number) {
  const start = [1,2,3];
  const end = [totalPages-2, totalPages-1, totalPages];
  const middle = [currentPage-1, currentPage, currentPage+1];
  const all = [...start, ...middle, ...end];

  if (totalPages <= 6) {
    return all;
  }
  if (currentPage < 3) {
    return [...start, null, ...end];
  }
  if (currentPage > totalPages - 2) {
    return [...start, null, ...end];
  }
  return [1, null, ...middle, null, totalPages];
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