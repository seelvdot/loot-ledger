import { Text, IconButton } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from '@mynaui/icons-react';

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
    <div className="flex items-center justify-between p-4 border-t border-neutral-400/10 bg-neutral-100/2.5">
      <Text size="1" className="text-neutral-500 font-space-grotesk uppercase">
        Total_{totalRecords}_registros
      </Text>
      <div className="flex items-center gap-4">
        <IconButton
          size="1"
          variant="surface"
          disabled={currentPage === 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer!"
        >
          <ChevronLeft size={16} />
        </IconButton>
        <Text size="1" className="font-space-grotesk text-lime-300">
          PÁGINA_{currentPage}_DE_{totalPages || 1}
        </Text>
        <IconButton
          size="1"
          variant="surface"
          disabled={currentPage === totalPages || loading}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer!"
        >
          <ChevronRight size={16} />
        </IconButton>
      </div>
    </div>
  );
}
