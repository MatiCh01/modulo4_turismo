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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-black text-[#051F20]">Crear Cuenta</h2>
        <p className="text-xs text-slate-500 mt-1">Sumate a Nativa y viví tu próxima experiencia</p>
      </div>

      {/* Notificación de Error devuelta por el Backend */}
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
          {serverError}
        </div>
      )}

      {/* Notificación de Éxito */}
      {successMessage && (
        <div className="p-3 bg-[#DAF1DE] border border-[#8EB69B] text-[#051F20] rounded-xl text-sm font-semibold text-center">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Juan Pérez"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
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
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Dirección</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Calle 123, Ciudad"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#051F20] mb-1">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+54 11 12345678"
          className="w-full px-4 py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#235347] focus:border-transparent text-sm transition-all"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || Object.keys(errors).length > 0 || !data.email || !data.password}
        className="bg-[#235347] hover:bg-[#163832] disabled:bg-slate-200 disabled:text-slate-400 text-[#DAF1DE] font-semibold py-3 rounded-xl transition-all text-sm shadow-sm mt-2 flex items-center justify-center border border-[#8EB69B]/20"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};