import React from "react";
import { CardProps } from "@/interface/productinterface";

export const Card: React.FC<CardProps> = ({ product }) => {
  const { name, price, image, description, stock } = product;

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow max-w-sm bg-white flex flex-col justify-between">
      <div>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm my-2 line-clamp-3">{description}</p>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {stock} cupos disponibles
        </span>
      </div>
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
        <span className="text-lg font-bold text-green-600">${price} USD</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
          Ver Destino
        </button>
      </div>
    </div>
  );
};