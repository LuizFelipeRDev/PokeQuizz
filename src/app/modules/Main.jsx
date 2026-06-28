"use client"

import PokemonQuiz from '@/app/components/PokemonQuiz'
import { Player } from '@/app/components/Player'
import ScoreBoard from '@/app/components/ScoreBoard'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from "framer-motion";
import Image from 'next/image'
import pikachu from "@/app/assets/pikachu.gif"
import ChatBallon from '@/app/components/ChatBallon';

const Main = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mistakeStreak, setMistakeStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const scoreRef = useRef(0);

  // Mantém a ref sempre atualizada com o score mais recente
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Carrega recorde do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem("pokequizRecord");
    if (saved) setRecord(Number(saved));
  }, []);

  const calcPoints = useCallback((mistakes, currentCombo) => {
    const base = Math.min(currentCombo * 100, 600);
    const penalty = mistakes * 20;
    return Math.max(base - penalty, 20);
  }, []);

  const handleCorrect = useCallback(() => {
    const newCombo = combo + 1;
    const points = calcPoints(mistakeStreak, newCombo);
    setScore(prev => prev + points);
    setCombo(newCombo);
    setMistakeStreak(0);
  }, [combo, mistakeStreak, calcPoints]);

  const handleWrong = useCallback(() => {
    setCombo(0);
    setMistakeStreak(prev => prev + 1);
  }, []);

  const handleGameOver = useCallback(() => {
    const finalScore = scoreRef.current;
    if (finalScore > record) {
      localStorage.setItem("pokequizRecord", String(finalScore));
      setRecord(finalScore);
    }
  }, [record]);

  // Reset via custom event disparado pelo PokemonQuiz
  useEffect(() => {
    const reset = () => {
      setScore(0);
      setCombo(0);
      setMistakeStreak(0);
    };
    window.addEventListener("resetQuiz", reset);
    return () => window.removeEventListener("resetQuiz", reset);
  }, []);

  const commonProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 },
  }

  return (
    <section className=" bg-[#0a0a0a] relative">
      {/* Cosmic Aurora */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
          `,
        }}
      />
      {/* === TÍTULO === */}

      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute max-sm:mb-80"
            style={{ left: `${10 + i * 12}%`, bottom: "-10vh" }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: ["-800%", "-1600%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-white fill-none max-sm:w-4 max-sm:h-4 max-sm:-translate-y-4"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
            </svg>
          </motion.span>
        ))}
      </div>

      {/* Conteúdo na frente */}
      <div className="relative z-10 flex items-center justify-center h-[44rem] max-sm:h-[60rem] max-sm:flex-col max-sm:items-center max-sm:gap-2">

        <div className="flex items-start gap-4 pt-12">
          <motion.div {...commonProps} transition={{ ...commonProps.transition, delay: 0.3 }} className="self-center">

              <Player />
          </motion.div>
          <div className="flex flex-col items-center gap-1">
            <motion.div {...commonProps} transition={{ ...commonProps.transition, delay: 0.5 }}>
              <ScoreBoard score={score} combo={combo} mistakes={mistakeStreak} record={record} />
            </motion.div>
            <motion.div {...commonProps} transition={{ ...commonProps.transition, delay: 0.6 }}>
              <PokemonQuiz onCorrect={handleCorrect} onWrong={handleWrong} onGameOver={handleGameOver} />
            </motion.div>
          </div>
        </div>

        <motion.div {...commonProps} transition={{ ...commonProps.transition, delay: 0.2 }}
          className="relative flex justify-center items-end max-sm:mt-32">
          <div className="relative max-h-[30rem] overflow-visible">
            {/* Balão absoluto acima do pikachu */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[1rem] max-sm:text-[0.9rem]">
              <ChatBallon
                delay={50}
                pause={2000}
                deleteSpeed={20}
                text={["Olá, treinador! Veio testar seus conhecimentos do mundo Pokémon? ⚡",
                  "Já pegou quantos Pokémon? Eu e o Ash já conhecemos tantos que perdi as contas! 😄",
                  "Se você me pedir pra carregar o celular... talvez eu cobre um ketchup.",
                  "Já perdi batalhas importantes... mas nunca deixei de levantar para a próxima.",
                  "Hmm... será que você sabe qual é o meu ataque mais forte? Dica: não é só choque! 😏⚡🔥",
                  "Uma vez um Rapidez meu errou o alvo e acertou a equipe Rocket… eles voaram tão longe que viram o nascer do sol! 🚀⚡😆",
                ]} expandedText=" Se eu ganhasse uma moeda por cada vez que a Equipe Rocket decolou... eu comprava uma fábrica de ketchup."
              />
            </div>

            <Image
              src={pikachu}
              alt="Pikachu animado"
              width={300}
              height={300}
              unoptimized
              className="block transform   w-40 h-35"
            />
          </div>
        </motion.div>


      </div>
    </section>
  )
}

export default Main
