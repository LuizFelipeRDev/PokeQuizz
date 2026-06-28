"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function PokemonQuiz({ onCorrect, onWrong, onGameOver }) {
  const [started, setStarted] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showAnswerAnim, setShowAnswerAnim] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading controlado aqui

  const MAX_GEN3 = 386;
  const ANSWER_DELAY = 1000; // =<<<<< Define o tempo de transição, super importante essa const

  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * MAX_GEN3) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();
    const correctName = data.name;

    const wrongOptions = [];
    while (wrongOptions.length < 2) {
      const wrongId = Math.floor(Math.random() * MAX_GEN3) + 1;
      if (wrongId !== randomId) {
        const resExtra = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${wrongId}`
        );
        const extraData = await resExtra.json();
        if (!wrongOptions.includes(extraData.name))
          wrongOptions.push(extraData.name);
      }
    }

    const allOptions = [correctName, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setPokemon({
      name: correctName,
      image: data.sprites.other["official-artwork"].front_default,
    });
    setOptions(allOptions);
    setRevealed(false);
  };


  const handleAnswer = (choice) => {
    setRevealed(true);
    setShowAnswerAnim(true);

    if (choice === pokemon.name) {
      setIsCorrect(true);
      const newScore = score + 1;
      setScore(newScore);
      onCorrect?.();

      if (newScore >= 5) {
        setTimeout(() => {
          setGameOver(true);
          onGameOver?.();
        }, ANSWER_DELAY);
        return;
      }
    } else {
      setIsCorrect(false);
      onWrong?.();
    }

    setTimeout(() => {
      setShowAnswerAnim(false);
      setIsCorrect(null);
      fetchPokemon(); // busca próximo Pokémon
    }, ANSWER_DELAY);
  };


  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsCorrect(null);
    setRevealed(false);
    setShowAnswerAnim(false);
    setStarted(false);
    setLoading(true); // ativa o loading
    window.dispatchEvent(new CustomEvent("resetQuiz"));

    setTimeout(() => {
      setLoading(false);
      setStarted(true);
      fetchPokemon();
    }, ANSWER_DELAY);
  };


  // === CLASSES PADRÃO ===
  const containerClasses =
    "GlowPower w-96 h-120 max-[430px]:w-80 max-[368px]:w-70 bg-red-600 rounded-3xl p-6 shadow-xl text-center flex flex-col justify-between relative border-4 border-gray-800";
  const screenClasses = `rounded-xl p-4 flex justify-center items-center min-h-[160px] border-4 border-gray-800 transition-colors duration-500 ${revealed ? "bg-gray-800" : "bg-gray-300"
    }`;
  const buttonClasses =
    "first-letter:uppercase lowercase rounded-lg shadow-md w-80 max-[430px]:w-64 max-[368px]:w-58 h-14 truncate transition-transform duration-200 hover:scale-105 disabled:opacity-50 text-white font-semibold";

  return (
    <div className=" flex flex-col items-center justify-center p-6  text-white ">
      {/* === LOADING === */}
      {loading && (
        <div className={containerClasses}>
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            <motion.img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokebola"
              className="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="text-white text-xl font-bold font-Bits drop-shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse">
              Carregando...
            </p>
          </div>
        </div>
      )}

      {/* === MENU INICIAL === */}
      {!started && !loading && (
        <div className={containerClasses}>
          <div className="flex flex-col items-center justify-center flex-1 relative">
            <div
              className={`relative w-84 max-[430px]:w-64 max-[368px]:w-56  mb-40 h-48  ${screenClasses}`}
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                alt="Pikachu"
                className="absolute top-10 w-full h-full object-contain animate-bounce-pikachu"
              />
              {/* explosões da tela */}
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-green-400 opacity-90 animate-ping"></div>
              <div className="absolute top-8 right-60 w-8 h-8 rounded-full bg-yellow-400 opacity-90 animate-ping [animation-delay:0.2s]"></div>
              <div className="absolute top-30 right-40 w-8 h-8 rounded-full bg-blue-600 opacity-90 animate-ping [animation-delay:0.3s]"></div>
              <div className="absolute top-10 right-20 w-8 h-8 rounded-full bg-violet-500 opacity-90 animate-ping [animation-delay:0.6s]"></div>
              <div className="absolute top-40 right-13 w-8 h-8 rounded-full bg-rose-400 animate-ping [animation-delay:0.1s]"></div>
            </div>

            {/* Conteúdo abaixo da tela */}
            <div className="flex flex-col items-center gap-4 absolute mt-60">
              <h1 className="text-3xl  font-bold animate-pulse uppercase fontBits">
                PokeQuiz
              </h1>
              <button
                onClick={startGame}
                className="btnBonito3 px-8 py-3 font-bold text-black shadow-md animate-bounce-button"
              >
                <span className="texto text-[1.25rem] fontBits">
                  Iniciar
                </span>
                <span className="bg-left"></span>
                <span className="bg-right"></span>
              </button>

              {/* Frase + estrelas looping */}
              <div className="flex flex-col items-center justify-center ">
                <h2 className=" text-[0.6rem] max-sm:text-[0.5rem] mb-2 font-bold text-yellow-400 fontBits text-center drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]">
                  Acerte 5 para conquistar sua Insígnia!
                </h2>
                <div className="flex gap-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-yellow-400 stroke-yellow-300 drop-shadow-[0_0_12px_rgba(255,255,0,0.9)]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === JOGO === */}
      {started && !loading && pokemon && (
        <div className={containerClasses}>
          {/* contador de estrelas */}
          <div className="flex justify-center mb-3 gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const active = i < score;
              return (
                <motion.div
                  key={`${i}-${score}-${gameOver}`}
                  initial={{ scale: 1, opacity: 0.7, rotate: 0 }}
                  animate={
                    active
                      ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 10, -10, 0],
                      }
                      : { scale: 1, opacity: 0.7, rotate: 0 }
                  }
                  transition={
                    active
                      ? {
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }
                      : { duration: 0.3 }
                  }
                >
                  <Star
                    className={`w-8 h-8 ${active
                      ? "fill-yellow-400 stroke-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,0,0.9)]"
                      : "fill-gray-200 stroke-gray-200 opacity-70"
                      }`}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className={screenClasses}>
            <img
              src={pokemon.image}
              alt="Pokemon"
              className={`w-42 h-42 object-contain transition-all duration-500 ${revealed ? "brightness-100" : "brightness-0"
                }`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-4">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={revealed}
                className={`btnBonito3  ${buttonClasses}`}
              >
                <span className="texto text-[1.25rem] max-sm:text-[1rem] fontBits ">
                  {opt}
                </span>
                <span className="bg-left"></span>
                <span className="bg-right"></span>
              </button>
            ))}
          </div>

          {showAnswerAnim && (
            <>
              {/* Overlay bloqueando interações */}
              <div className="absolute inset-0 bg-black/30 z-20 pointer-events-auto"></div>

              {/* Mensagem de resposta */}
              <p
                className={`absolute top-[45%] left-[84%] max-sm:left-[90%] max-[360px]:left-[96%] max-w-[16rem] w-full px-4 py-2 z-30 
      -translate-x-1/2 text-2xl font-bold capitalize bg-black/70 text-center 
      animate-answer ${isCorrect
                    ? "text-green-400 fontBits shadow-[0_0_12px_rgba(255,255,100,0.9)]"
                    : "text-red-400 fontBits shadow-[0_0_12px_rgba(255,100,100,0.9)]"
                  }`}
              >
                {isCorrect
                  ? `Era o ${pokemon.name}!`
                  : `Era o ${pokemon.name}!`}
              </p>
            </>
          )}


          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex flex-col z-50 items-center justify-center rounded-3xl p-6 ">
              <h2 className="text-3xl max-sm:text-2xl fontBits font-bold mb-4
               text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,120,1)] animate-bounce">
                Parabéns! 🎉
              </h2>
              <p className="mb-4 fontBits text-yellow-200 drop-shadow-[0_0_12px_rgba(255,255,180,0.9)] animate-pulse">
                Você acertou 5 Pokémons!
              </p>

              <button
                onClick={startGame}
                className="btnBonito3 bg-yellow-400 hover:bg-yellow-500 w-full py-3 font-bold text-black shadow-md mb-3"
              >
                <span className="texto fontBits text-[1rem] max-sm:text-[0.8rem]">
                  Jogar novamente
                </span>
                <span className="bg-left"></span>
                <span className="bg-right"></span>
              </button>

              <button
                onClick={() => setStarted(false)}
                className="  btnBonito3 w-full px-8 py-3 font-bold text-black shadow-md"
              >
                <span className="texto fontBits text-[1rem] max-sm:text-[0.8rem]">
                  Voltar ao menu
                </span>
                <span className="bg-left"></span>
                <span className="bg-right"></span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
