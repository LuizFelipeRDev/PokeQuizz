"use client"

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import pokebol from "@/app/assets/pokebol.svg"
import { SkipBack, Play, Pause, SkipForward } from "lucide-react"

const tracks = [
  { src: "/audio/BattleGymLeader.ogg", name: "Battle! (Gym Leader)" },
  { src: "/audio/PokemonCenter.ogg", name: "Pokemon Center" },
]

export const Player = () => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const isPlayingRef = useRef(false)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlayingRef.current) {
      audio.pause()
    } else {
      audio.play()
    }
    const next = !isPlayingRef.current
    isPlayingRef.current = next
    setIsPlaying(next)
  }

  const changeTrack = (index) => {
    const audio = audioRef.current
    if (!audio) return
    const newIndex = (index + tracks.length) % tracks.length
    setCurrentTrack(newIndex)
  }

  const handleNextTrack = () => {
    changeTrack(currentTrack + 1)
  }

  // Quando a faixa muda, mantém o estado de reprodução
  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlayingRef.current) {
      audio.play()
    }
  }, [currentTrack])

  return (
    <div className="flex flex-col items-center select-none">
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onEnded={handleNextTrack}
      />

      {/* Pokebola girando */}
      <div className="relative z-0 h-16 -mb-4">
        <div className={`w-24 h-24 rounded-full border-4 border-zinc-400 shadow-md flex items-center justify-center overflow-hidden ${isPlaying ? "animate-[spin_3s_linear_infinite]" : ""}`}>
          <Image
            src={pokebol}
            alt="Pokebola"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Controles */}
      <div className="z-30 flex flex-col w-44 bg-white shadow-md rounded-2xl shadow-zinc-400 pt-6 pb-3 px-2">
        {/* Nome da música */}
        <p className="text-black text-[0.6rem] text-center fontBits truncate px-2 -mt-1 mb-2">
          {tracks[currentTrack].name}
        </p>

        <div className="flex flex-row items-center justify-center space-x-3">
          {/* Skip Back */}
          <button onClick={() => changeTrack(currentTrack - 1)} className="flex items-center justify-center w-9 h-9 text-zinc-700 hover:text-zinc-900 transition-colors">
            <SkipBack size={20} />
          </button>

          {/* Play / Pause */}
          <button onClick={togglePlay} className="flex items-center justify-center w-9 h-9 text-zinc-700 hover:text-zinc-900 transition-colors">
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>

          {/* Skip Forward */}
          <button onClick={handleNextTrack} className="flex items-center justify-center w-9 h-9 text-zinc-700 hover:text-zinc-900 transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
