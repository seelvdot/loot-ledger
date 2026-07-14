'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiService } from '../../services/api.service';
import { Button, Card, InputField } from '@core/evokit';
import { ThemeToggle } from '../../components/ThemeToggle';
import { At, LockHexagon, Password } from '@mynaui/icons-react';

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

export function LoginForm() {
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
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="min-w-112.5">
        <Card>
          <div className="p-8 pb-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="font-space-grotesk flex flex-col gap-12">
                <div>
                  <div className="uppercase text-xl text-foreground flex gap-2">
                    <LockHexagon
                      strokeWidth={2}
                      className="text-primary"
                      size={28}
                    />
                    Secure auth
                  </div>
                  <div className="bg-primary h-0.5 w-14 mt-3 mb-1.5"></div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    Inicializar sequência biométrica ou manual
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <InputField
                      label={errors.email ? 'EMAIL ERROR' : 'EMAIL ACCESS'}
                      placeholder="EMAIL TOKEN"
                      prefix={<At strokeWidth={1} size={18} />}
                      {...register('email')}
                      disabled={loading}
                      error={errors.email?.message}
                    />
                  </div>
                  <div>
                    <InputField
                      label={errors.password ? 'PASSWORD ERROR' : 'PASSWORD ACCESS'}
                      placeholder="PASSWORD TOKEN"
                      type="password"
                      prefix={<Password strokeWidth={1} size={18} />}
                      {...register('password')}
                      disabled={loading}
                      error={errors.password?.message}
                    />
                  </div>
                </div>
                <Button
                   type="submit"
                   className="w-full!"
                   size="lg"
                   disabled={loading}
                   loading={loading}
                >
                  {loading ? 'Acessando' : 'Entrar'}
                </Button>
              </div>
              <div className="h-10 flex justify-end items-center mt-2">
                {loading && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary animate-pulse"></div>
                    <div
                      className="w-1.5 h-1.5 bg-primary animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-primary animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                )}
                {!loading && (
                  <div className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="w-1.5 h-1.5 bg-muted"
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
