// app/login/page.tsx
'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { School } from 'lucide-react';

// Aunque es un componente de cliente, podemos exportar metadata estática
// (Esta es una característica más avanzada, pero es bueno saberla)
// Para que funcione correctamente, necesitarías ponerla en un archivo layout.tsx dentro de /login
// Por ahora, la dejamos comentada como referencia.
/*
export const metadata: Metadata = {
  title: "Iniciar Sesión - CAIBook",
  description: "Accede a tu cuenta de CAIBook.",
};
*/

// 1. ESQUEMA DE VALIDACIÓN PARA EL LOGIN (más simple)
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El correo es requerido." })
    .email({ message: "Debe ser un formato de correo válido." })
    .refine((email) => email.endsWith('@uc.cl'), { message: "El correo debe ser institucional (@uc.cl)." }),
  password: z.string()
    .min(1, { message: "La contraseña es requerida." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Intento de login con:", data);
    // Aquí iría la lógica para enviar los datos al backend para autenticar al usuario
    alert('Intento de login. Revisa la consola para ver los datos.');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-light p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        {/* Encabezado del Formulario */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <School className="h-10 w-10 text-brand-primary" />
            <span className="text-3xl font-bold text-brand-dark">CAIBook</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-dark">
            Bienvenido de vuelta
          </h1>
          <p className="mt-2 text-slate-600">
            Ingresa tus credenciales para acceder a la plataforma.
          </p>
        </div>

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <Input 
              id="email" 
              label="Correo Institucional (@uc.cl)" 
              type="email" 
              autoComplete="email"
              {...register('email')} 
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Input 
              id="password" 
              label="Contraseña" 
              type="password" 
              autoComplete="current-password"
              {...register('password')} 
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Opcional: Enlace para recuperar contraseña */}
          <div className="text-right text-sm">
            <Link href="/forgot-password" className="font-medium text-brand-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-slate-600 px-4 py-3 font-semibold text-white shadow-sm transition-opacity hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Enlace a Registro */}
        <p className="mt-8 text-center text-sm text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/Register" className="font-medium text-brand-primary hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}