import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@components/pagination";

export default function TablePagination({
  stateLength,
  page,
  itemsPerPage,
}: {
  stateLength: number;
  page: number;
  itemsPerPage: number;
}) {
  return (
    <Pagination>
      <PaginationPrevious href={page === 1 ? null : `?page=${page - 1}`} />
      <PaginationList>
        {Array.from({ length: Math.ceil(stateLength / itemsPerPage) }).map(
          (_, i) => {
            const pageNumber = i + 1;
            return (
              <PaginationPage key={pageNumber} href={`?page=${pageNumber}`}>
                {pageNumber as unknown as string}
              </PaginationPage>
            );
          }
        )}
      </PaginationList>
      <PaginationNext
        href={
          stateLength <= page * itemsPerPage ? null : `?page=${page + 1}`
        }
      />
    </Pagination>
  );
}
