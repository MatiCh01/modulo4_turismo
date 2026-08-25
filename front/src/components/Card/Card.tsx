import React from "react";
import Link from "next/link";
import { CardProps } from "@/interface/product.interface";

export const Card: React.FC<CardProps> = ({ product }) => {
  const { id, name, price, image, description, stock } = product;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden w-full max-w-sm">
      <div>
        {/* Contenedor de Imagen con Overlay y Badge de Cupos */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 right-3 bg-[#051F20]/85 backdrop-blur-md text-[#DAF1DE] text-xs font-semibold px-3 py-1 rounded-full border border-[#8EB69B]/30 shadow-sm">
            🍃 {stock} cupos
          </span>
        </div>

        {/* Información del Destino */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-[#051F20] group-hover:text-[#163832] transition-colors">
            {name}
          </h2>
          <p className="text-slate-600 text-sm my-2 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer de la Card */}
      <div className="px-5 pb-5 pt-3 flex justify-between items-center border-t border-slate-100">
        <div>
          <span className="block text-[10px] uppercase font-bold text-[#8EB69B]">Precio</span>
          <span className="text-lg font-extrabold text-[#051F20]">
            ${price} <span className="text-xs font-normal text-slate-500">USD</span>
          </span>
        </div>

        <Link
          href={`/product/${id}`}
          className="bg-[#235347] hover:bg-[#163832] text-[#DAF1DE] px-4 py-2 rounded-xl transition-all text-xs font-semibold shadow-sm border border-[#8EB69B]/20 hover:scale-[1.02]"
        >
          Ver Destino
        </Link>
      </div>
    </article>
  );
};