"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 flex justify-start w-full py-[0.8rem] px-[4rem] max-sm:px-[2rem] items-center text-slate-50 z-20 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <h3
        className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-wider cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        POKE<span className="text-sky-500">QUIZZ</span>
      </h3>
    </nav>
  );
}
