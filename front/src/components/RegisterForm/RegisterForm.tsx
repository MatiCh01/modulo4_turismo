"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";
import { IRegisterProps, IRegisterErrors, validateRegisterForm } from "@/helpers/validateRegister";

export const RegisterForm = () => {
  const router = useRouter();

  const [data, setData] = useState<IRegisterProps>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    setErrors(validateRegisterForm(updatedData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    const validationErrors = validateRegisterForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Llamada asíncrona a la API del backend
      await registerUser(data);
      
      setSuccessMessage("¡Registro exitoso! Redirigiendo al inicio de sesión...");
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Error al registrar el usuario. Intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Crear Cuenta</h2>

      {/* Notificación de Error devuelta por el Backend */}
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
          {serverError}
        </div>
      )}

      {/* Notificación de Éxito */}
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium text-center">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Juan Pérez"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

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

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Dirección</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Calle 123, Ciudad"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+54 11 12345678"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || Object.keys(errors).length > 0 || !data.email || !data.password}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm mt-2 flex items-center justify-center"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};