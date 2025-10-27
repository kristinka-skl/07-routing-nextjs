import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedObj: { selected: number }) => void;
  forcePage: number;
}
export default function Pagination({
  totalPages,
  forcePage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={forcePage}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="←"
      nextLabel="→"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
