"use client";

import React, { useState } from "react";
import { ILoginProps, ILoginErrors, validateLoginForm } from "@/helpers/validateLogin";

export const LoginForm = () => {
  const [data, setData] = useState<ILoginProps>({ email: "", password: "" });
  const [errors, setErrors] = useState<ILoginErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    setErrors(validateLoginForm(updatedData));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(data);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Submit exitoso - Login:", data);
      alert("Inicio de sesión exitoso");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Iniciar Sesión</h2>
      
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
        disabled={Object.keys(errors).length > 0 || !data.email || !data.password}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm mt-2"
      >
        Ingresar
      </button>
    </form>
  );
};