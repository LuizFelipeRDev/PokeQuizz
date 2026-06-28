"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterComponent from "typewriter-effect";

export default function ChatBallon({ text = [], expandedText = "", delay = 50, pause = 1000, deleteSpeed = 50, width = "w-64" }) {
  const [expanded, setExpanded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const containerRef = useRef(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
        setTypedText("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Typewriter do texto expandido
  useEffect(() => {
    if (!expanded) return;

    setTypedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < expandedText.length) {
        setTypedText((prev) => prev + expandedText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [expanded, expandedText, delay]);

  return (
    <div className="flex justify-center items-center p-4">
      <motion.div
        ref={containerRef}
        className={`relative bg-yellow-300 text-slate-900 font-semibold px-4 py-4 rounded-xl shadow-lg cursor-pointer select-none 
          before:content-[''] before:absolute before:left-1/2 before:-bottom-4 before:-translate-x-1/2 
          before:border-8 before:border-t-yellow-300 before:border-x-transparent before:border-b-transparent 
          transition-all ${width}`}
        whileHover={{ scale: 1.05 }}
        onClick={() => !expanded && setExpanded(true)}
      >
        <span className="relative z-10">
          {expanded ? (
            <AnimatePresence>
              <motion.div
                key="expanded-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-800 mt-2  text-center">{typedText}</p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="relative text-center">
              <TypewriterComponent
                onInit={(typewriter) => {
                  const phrases = Array.isArray(text) ? text : [text];

                  phrases.forEach((phrase) => {
                    typewriter
                      .typeString(phrase)
                      .pauseFor(pause)  
                      .deleteAll(deleteSpeed);
                  });

                  typewriter.start();
                }}
                options={{
                  autoStart: true,
                  loop: true,
                  delay: delay,
                }}
              />
              <div className="absolute right-0">
                <div className="loader"></div>
              </div>
            </div>
          )}
        </span>
      </motion.div>
    </div>
  );
}
