"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { ILoginProps, ILoginErrors, validateLoginForm } from "@/helpers/validateLogin";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { setUserData } = useAuth();

  const [data, setData] = useState<ILoginProps>({ email: "", password: "" });
  const [errors, setErrors] = useState<ILoginErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    setErrors(validateLoginForm(updatedData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateLoginForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(data);

      if (response.token) {
        setUserData({
          token: response.token,
          user: response.user,
        });
      }

      // Redirección dinámica: /cart si venía de reservar, o / si fue un login directo
      router.push(redirectPath);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Credenciales inválidas o error de conexión.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-black text-[#051F20]">Bienvenido de nuevo</h2>
        <p className="text-xs text-slate-500 mt-1">Ingresá a tu cuenta para gestionar tus reservas</p>
      </div>

      {/* Cartel de error devuelto por la API */}
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-4 py-2.5 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || Object.keys(errors).length > 0 || !data.email || !data.password}
        className="bg-[#235347] hover:bg-[#163832] disabled:bg-slate-200 disabled:text-slate-400 text-[#DAF1DE] font-semibold py-3 rounded-xl transition-all text-sm shadow-sm mt-2 flex items-center justify-center border border-[#8EB69B]/20"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};