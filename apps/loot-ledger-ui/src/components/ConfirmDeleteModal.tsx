'use client';

import { Button, Modal } from '@core/evokit';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title = 'Exclusão',
  message = 'Esta ação não pode ser desfeita. Deseja continuar?',
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title={title}
      className="max-w-sm"
    >
      <div className="flex flex-col gap-4 text-muted-foreground text-sm font-space-grotesk">
        <div className="border-l-2 border-rose-400/80 pl-4 mb-4">
          <span
            className="text-rose-400 text-[10px] uppercase block mb-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [SECURITY WARNING]
          </span>
          <p className="text-foreground text-sm">{message}</p>
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Deletar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
