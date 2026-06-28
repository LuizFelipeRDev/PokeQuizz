"use client";

import React from "react";

export default function ScoreBoard({ score, combo, mistakes, record }) {
  const isNewRecord = record > 0 && score >= record;

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 mb-4 fontBits">
      {/* Score */}
      <div className="flex flex-col items-center">
        <span className="text-[0.5rem] text-slate-400 tracking-wider">SCORE</span>
        <span className="text-2xl text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]">
          {score}
        </span>
      </div>

      {/* Record */}
      <div className="flex flex-col items-center">
        <span className="text-[0.5rem] text-slate-400 tracking-wider">RECORD</span>
        <span className={`text-lg ${isNewRecord ? "text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.7)]" : "text-slate-400"}`}>
          {record}
        </span>
        {isNewRecord && <span className="text-[0.4rem] text-purple-300 animate-pulse">NOVO!</span>}
      </div>

      {/* Combo */}
      <div className="flex flex-col items-center">
        <span className="text-[0.5rem] text-slate-400 tracking-wider">COMBO</span>
        <span className={`text-lg ${combo > 1 ? "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "text-slate-500"}`}>
          x{combo}
        </span>
      </div>

      {/* Penalty indicator */}
      {mistakes > 0 && (
        <div className="flex flex-col items-center">
          <span className="text-[0.5rem] text-slate-400 tracking-wider">PENALTY</span>
          <span className="text-lg text-red-400">-{mistakes * 20}</span>
        </div>
      )}
    </div>
  );
}
