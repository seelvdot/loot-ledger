import { Pagination } from '@core/evokit';

interface TransactionPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export function TransactionPagination({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  loading,
}: TransactionPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalRecords={totalRecords}
      recordsLabel="transações"
      onPageChange={onPageChange}
      disabled={loading}
      pageSize={10}
    />
  );
}
