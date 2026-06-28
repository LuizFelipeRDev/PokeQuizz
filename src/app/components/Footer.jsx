"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-700 py-6 flex items-center justify-center bg-[#0a0a0a] relative">
      <div className="text-center flex flex-col gap-2 z-10">
        <p className="text-slate-400 text-sm">
          &copy; 2025 <span className="text-sky-500 font-semibold">PokeQuiz - A LUE PROJECT</span>
        </p>
        <p className="text-slate-500 text-xs">
          Feito com <span className="text-red-500">♥</span> por um treinador
        </p>
      </div>


    </footer>
  );
};

export default Footer;
