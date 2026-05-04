'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiService } from '../../services/api.service';
import { Button, LCard, TextField } from '@loot-ledger/ui';
import { Text } from '@radix-ui/themes';

import { ArrowRight, At, LockHexagon, Password } from '@mynaui/icons-react';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      router.push('/ledger');
    }
  }, [router]);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const data = await apiService.post<any>('/auth/login', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        router.push('/ledger');
      }, 2500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="min-w-112.5">
        <LCard>
          <div className="p-8 pb-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="font-space-grotesk flex flex-col gap-12">
                <div>
                  <div className="uppercase text-xl text-neutral-100 flex gap-2">
                    <LockHexagon
                      strokeWidth={2}
                      className="text-lime-300"
                      size={28}
                    />
                    Secure_auth
                  </div>
                  <div className="bg-lime-300 h-0.5 w-14 mt-3 mb-1.5"></div>
                  <p className="text-neutral-400 text-xs uppercase tracking-wide">
                    Inicializar sequência biométrica ou manual
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <p
                      className={`uppercase text-[10px] mb-1 ${errors.email ? 'text-red-400' : 'text-lime-300'}`}
                    >
                      {errors.email ? 'EMAIL_ERROR' : 'EMAIL_ACCESS'}
                    </p>
                    <TextField.Root
                      placeholder="EMAIL_TOKEN"
                      size="3"
                      className="text-xs!"
                      color={errors.email ? 'red' : 'lime'}
                      {...register('email')}
                      disabled={loading}
                    >
                      <TextField.Slot>
                        <At strokeWidth={1} size={18} />
                      </TextField.Slot>
                    </TextField.Root>
                  </div>
                  <div>
                    <p
                      className={`uppercase text-[10px] mb-1 ${errors.password ? 'text-red-400' : 'text-lime-300'}`}
                    >
                      {errors.password ? 'PASSWORD_ERROR' : 'PASSWORD_ACCESS'}
                    </p>
                    <TextField.Root
                      placeholder="PASSWORD_TOKEN"
                      size="3"
                      className="text-xs!"
                      type="password"
                      color={errors.password ? 'red' : 'lime'}
                      {...register('password')}
                      disabled={loading}
                    >
                      <TextField.Slot>
                        <Password strokeWidth={1} size={18} />
                      </TextField.Slot>
                    </TextField.Root>
                  </div>
                </div>
                <Button
                  className="w-full! uppercase! cursor-pointer!"
                  size="3"
                  disabled={loading}
                >
                  {loading ? 'Acessando' : 'Entrar'}
                </Button>
              </div>
              <div className="h-10 flex justify-end items-center mt-2">
                {loading && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-lime-300 animate-pulse"></div>
                    <div
                      className="w-1.5 h-1.5 bg-lime-300 animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-lime-300 animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                )}
                {!loading && (
                  <div className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="w-1.5 h-1.5 bg-neutral-300/25"
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </LCard>
      </div>
    </div>
  );
}
