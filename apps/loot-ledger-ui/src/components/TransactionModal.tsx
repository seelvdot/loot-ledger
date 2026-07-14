'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Transaction } from '../types/transaction';
import { Button, InputField, Modal, Combobox, FileUploadZone } from '@core/evokit';
import { TextArea } from '@radix-ui/themes';
import { useTransactionStore } from '../store/useTransactionStore';

const transactionSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.coerce.number().positive('O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Categoria é obrigatória'),
  subcategory: z.string().optional(),
  date: z.string().min(1, 'Data é obrigatória'),
  observations: z.string().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        size: z.string(),
        data: z.string().optional(),
      })
    )
    .optional(),
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

  const { categories, subcategories, fetchCategories, fetchSubcategories } =
    useTransactionStore();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema) as any,
    defaultValues: {
      description: transaction?.description || '',
      observations: transaction?.observations || '',
      amount: transaction?.amount || ('' as any),
      type: transaction?.type || 'INCOME',
      category: transaction?.category || '',
      subcategory: transaction?.subcategory || '',
      date: transaction?.date
        ? new Date(transaction.date).toISOString().split('T')[0]
        : new Date().toLocaleDateString('en-CA'), // Formato YYYY-MM-DD local
      attachments: transaction?.attachments || [],
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
      ...(isEditing && transaction && { id: transaction.id }),
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      subcategory: data.subcategory || undefined,
      date: dateWithCurrentTime.toISOString(),
      observations: data.observations,
      attachments: data.attachments || [],
    });
  };

  const watchCategory = watch('category');
  const watchSubcategory = watch('subcategory');

  // Adiciona a categoria selecionada dinamicamente caso seja uma nova (customizada)
  const categoryList = [...categories];
  if (watchCategory && !categoryList.includes(watchCategory)) {
    categoryList.push(watchCategory);
  }
  const categoryOptions = categoryList.map((cat) => ({
    value: cat,
    label: cat.toUpperCase(),
  }));

  // Adiciona as subcategorias selecionadas dinamicamente caso sejam novas (customizadas)
  const selectedSubcategories = watchSubcategory ? watchSubcategory.split(',').filter(Boolean) : [];
  const subcategoryList = [...subcategories];
  selectedSubcategories.forEach((sub) => {
    if (!subcategoryList.includes(sub)) {
      subcategoryList.push(sub);
    }
  });
  const subcategoryOptions = subcategoryList.map((sub) => ({
    value: sub,
    label: sub.toUpperCase(),
  }));

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={isEditing ? 'Editar Registro' : isViewing ? 'Visualizar Registro' : 'Novo Registro'}
    >
      <div className="font-space-grotesk">
        <div className="border-l-2 border-primary pl-4 mb-4">
          <span
            className="text-primary text-[10px] uppercase block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [TRANSACTION ENTRY]
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div>
            <InputField
              label="Descrição"
              placeholder="EX: PAGAMENTO DE SERVICO"
              disabled={isViewing}
              error={errors.description?.message}
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputField
                label="Valor"
                type="number"
                step="0.01"
                placeholder="0.00"
                disabled={isViewing}
                error={errors.amount?.message}
                {...register('amount')}
              />
            </div>
            <div>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Combobox
                    label="Tipo"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isViewing}
                    options={[
                      { value: 'INCOME', label: 'ENTRADA' },
                      { value: 'EXPENSE', label: 'SAÍDA' },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Combobox
                    label="Categoria"
                    placeholder="Selecione ou crie..."
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isViewing}
                    options={categoryOptions}
                    error={errors.category?.message}
                  />
                )}
              />
            </div>
            <div>
              <InputField
                label="Data"
                type="date"
                disabled={isViewing}
                {...register('date')}
              />
            </div>
          </div>

          <div>
            <Controller
              name="subcategory"
              control={control}
              render={({ field }) => (
                <Combobox
                  label="Subcategoria"
                  placeholder="Selecione ou crie..."
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isViewing}
                  options={subcategoryOptions}
                  multi={true}
                />
              )}
            />
          </div>

          <div>
            <p
              className="uppercase text-primary text-[10px] mb-1 font-semibold tracking-widest"
              style={{ fontFamily: 'var(--font-header)' }}
            >
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

          {(!isViewing || (transaction?.attachments && transaction.attachments.length > 0)) && (
            <div>
              <p
                className="uppercase text-primary text-[10px] mb-1 font-semibold tracking-widest font-space-grotesk"
                style={{ fontFamily: 'var(--font-header)' }}
              >
                Comprovante / Anexo
              </p>
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <FileUploadZone
                    files={field.value || []}
                    onChange={field.onChange}
                    disabled={isViewing}
                  />
                )}
              />
            </div>
          )}

          {isViewing && (
            <Button
              variant="outline"
              className="mt-4 w-full"
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
                onClick={onClose}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
              >
                {isEditing ? 'Atualizar' : 'Confirmar'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
