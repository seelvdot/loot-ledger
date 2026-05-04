'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Transaction } from '../types/transaction';
import { Button, LCard, TextField } from '@loot-ledger/ui';
import { Text, Select, Heading, TextArea } from '@radix-ui/themes';

const transactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.coerce.number().positive('O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Categoria é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  observations: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  transaction?: Transaction;
  mode?: 'edit' | 'view';
}

export default function TransactionModal({
  onClose,
  onSave,
  transaction,
  mode,
}: TransactionModalProps) {
  const isEditing = mode === 'edit';
  const isViewing = mode === 'view';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: transaction?.description || '',
      observations: transaction?.observations || '',
      amount: transaction?.amount || ('' as any),
      type: transaction?.type || 'INCOME',
      category: transaction?.category || '',
      date: transaction?.date
        ? new Date(transaction.date).toISOString().split('T')[0]
        : new Date().toLocaleDateString('en-CA'), // Formato YYYY-MM-DD local
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    // Pegamos o horário atual para manter a ordem de inserção dentro do mesmo dia
    const now = new Date();
    const [year, month, day] = data.date.split('-').map(Number);
    const dateWithCurrentTime = new Date(year, month - 1, day);
    dateWithCurrentTime.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    );

    onSave({
      ...(isEditing && { id: transaction.id }),
      ...data,
      date: dateWithCurrentTime.toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="w-full max-w-md">
        <LCard>
          <div className="p-4">
            <header className="mb-8 border-l-2 border-lime-300 pl-4">
              <Text className="text-lime-300 text-[10px] uppercase font-space-grotesk block mb-1">
                [transaction_entry]
              </Text>
              <Heading
                size="5"
                className="text-neutral-100 uppercase font-space-grotesk!"
              >
                {isEditing
                  ? 'Editar_Registro'
                  : isViewing
                    ? 'Visualizar_Registro'
                    : 'Novo_Registro'}
              </Heading>
            </header>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div>
                <p className="uppercase text-[10px] mb-1 font-space-grotesk text-lime-300">
                  Descrição
                </p>
                <TextField.Root
                  placeholder="EX: PAGAMENTO_SERVICO"
                  {...register('description')}
                  size="3"
                  className="text-xs!"
                  color={errors.description ? 'red' : 'lime'}
                  disabled={isViewing}
                />
                <p
                  className={`uppercase text-[10px] h-4 mb-1 flex items-center font-space-grotesk ${errors.description ? 'text-red-400' : 'text-lime-300'}`}
                >
                  {errors.description ? 'ERRO: DESCRIÇÃO_OBRIGATÓRIA' : ''}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="uppercase text-[10px] mb-1 font-space-grotesk text-lime-300">
                    Valor
                  </p>
                  <TextField.Root
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register('amount')}
                    size="3"
                    className="text-xs!"
                    color={errors.amount ? 'red' : 'lime'}
                    disabled={isViewing}
                  />
                  <p className="uppercase text-[10px] h-4 mb-1 flex items-center font-space-grotesk text-red-400">
                    {errors.amount ? 'ERRO: VALOR_INVALIDO' : ''}
                  </p>
                </div>
                <div>
                  <p className="uppercase text-lime-300 text-[10px] mb-1 font-space-grotesk">
                    Tipo
                  </p>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select.Root
                        value={field.value}
                        onValueChange={field.onChange}
                        size="3"
                        disabled={isViewing}
                      >
                        <Select.Trigger
                          className="w-full! text-xs! font-space-grotesk"
                          color="lime"
                        />
                        <Select.Content
                          position="popper"
                          className="font-space-grotesk!"
                        >
                          <Select.Item value="INCOME" className="text-sm!">
                            ENTRADA
                          </Select.Item>
                          <Select.Item value="EXPENSE" className="text-sm!">
                            SAÍDA
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="uppercase text-[10px] mb-1 font-space-grotesk text-lime-300">
                    Categoria
                  </p>
                  <TextField.Root
                    placeholder="TAG_ID"
                    {...register('category')}
                    size="3"
                    className="text-xs!"
                    color={errors.category ? 'red' : 'lime'}
                    disabled={isViewing}
                  />
                  <p className="uppercase text-[10px] h-4 mb-1 flex items-center font-space-grotesk text-red-400">
                    {errors.category ? 'ERRO: CATEGORIA_OBRIGATÓRIA' : ''}
                  </p>
                </div>
                <div>
                  <p className="uppercase text-[10px] mb-1 font-space-grotesk text-lime-300">
                    Data
                  </p>
                  <TextField.Root
                    type="date"
                    {...register('date')}
                    size="3"
                    className="text-xs!"
                    color={errors.date ? 'red' : 'lime'}
                    disabled={isViewing}
                  />
                </div>
              </div>

              <div>
                <p className="uppercase text-[10px] mb-1 font-space-grotesk text-lime-300">
                  Observações
                </p>
                <TextArea
                  placeholder=""
                  {...register('observations')}
                  size="3"
                  className="text-xs!"
                  disabled={isViewing}
                />
              </div>

              {isViewing && (
                <Button
                  variant="surface"
                  className="flex-1 uppercase! cursor-pointer! mt-4!"
                  onClick={onClose}
                  type="button"
                >
                  Fechar
                </Button>
              )}

              {!isViewing && (
                <div className="flex gap-4 mt-4 justify-end">
                  <Button
                    variant="outline"
                    className="flex-1 uppercase! cursor-pointer!"
                    onClick={onClose}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 uppercase! cursor-pointer!"
                    type="submit"
                  >
                    {isEditing ? 'Atualizar' : 'Confirmar'}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </LCard>
      </div>
    </div>
  );
}
