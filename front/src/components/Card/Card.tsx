import React from "react";
import Link from "next/link";
import { CardProps } from "@/interface/product.interface";

export const Card: React.FC<CardProps> = ({ product }) => {
  const { id, name, price, image, description, stock } = product;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden w-full max-w-sm">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {stock} cupos
          </span>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {name}
          </h2>
          <p className="text-slate-600 text-sm my-2 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 flex justify-between items-center border-t border-slate-100">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">Precio</span>
          <span className="text-lg font-extrabold text-slate-900">${price} <span className="text-xs font-normal text-slate-500">USD</span></span>
        </div>

        <Link
          href={`/product/${id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-xs font-semibold shadow-sm"
        >
          Ver Destino
        </Link>
      </div>
    </article>
  );
};