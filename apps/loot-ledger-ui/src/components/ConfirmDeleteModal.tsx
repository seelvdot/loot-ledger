'use client';

import { Button, LCard } from '@loot-ledger/ui';
import { DangerCircle } from '@mynaui/icons-react';
import { Text, Heading } from '@radix-ui/themes';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm">
        <LCard>
          <div className="p-4">
            <header className="mb-6 border-l-2 border-red-400 pl-4">
              <Text className="text-red-400 text-[10px] uppercase font-space-grotesk block mb-1">
                [security_warning]
              </Text>
              <Heading
                size="4"
                className="text-neutral-100 uppercase font-space-grotesk!"
              >
                {title}
              </Heading>
            </header>

            <div className="flex gap-4 items-start mb-8 text-neutral-400">
              <Text size="2">{message}</Text>
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                className="flex-1 uppercase! cursor-pointer!"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 uppercase! cursor-pointer!"
                onClick={onConfirm}
              >
                Deletar
              </Button>
            </div>
          </div>
        </LCard>
      </div>
    </div>
  );
}
