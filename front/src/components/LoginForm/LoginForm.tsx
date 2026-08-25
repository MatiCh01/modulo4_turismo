"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { ILoginProps, ILoginErrors, validateLoginForm } from "@/helpers/validateLogin";

export const LoginForm = () => {
  const router = useRouter();
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

      // AuthContext se encarga automáticamente de sincronizar con localStorage
      if (response.token) {
        setUserData({
          token: response.token,
          user: response.user,
        });
      }

      router.push("/");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Iniciar Sesión</h2>

      {/* Cartel de error devuelto por la API */}
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || Object.keys(errors).length > 0 || !data.email || !data.password}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm mt-2 flex items-center justify-center"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};