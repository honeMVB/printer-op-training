'use client';

import { useState } from 'react';
import { QuizData } from '@/data/quizData';
import { saveQuizScore } from '@/lib/progress';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

export default function QuizComponent({ quiz }: { quiz: QuizData }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const currentQ = quiz.questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    setSubmitted(true);
    const newAnswers = [...answers, selectedOpt];
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quiz.questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setSubmitted(false);
    } else {
      // Calculate score
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) correct++;
      });
      const pct = Math.round((correct / quiz.questions.length) * 100);
      setScore(pct);
      saveQuizScore(quiz.moduleId, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setSubmitted(false);
    setAnswers([]);
    setScore(null);
  };

  if (score !== null) {
    const passed = score >= 70;
    return (
      <div className="glass-panel border border-emerald-500/20 rounded-3xl p-10 text-center max-w-xl mx-auto shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl relative z-10 ${
          passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
        }`}>
          <Award className="w-10 h-10" />
        </div>

        <h3 className="text-3xl font-black text-white mb-2 tracking-tight relative z-10">
          {passed ? 'Module Assessment Passed!' : 'Assessment Retake Suggested'}
        </h3>
        <p className="text-slate-300 text-base mb-8 font-light relative z-10">
          You scored <span className="text-cyan-400 font-black text-2xl mx-1">{score}%</span> on the {quiz.moduleTitle} knowledge test.
        </p>

        <div className="flex items-center justify-center gap-4 relative z-10">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-bold transition-all border border-white/10 backdrop-blur-md shadow-lg"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none rounded-full"></div>
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8 relative z-10">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Assessment</span>
        </div>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          Question {currentIdx + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#030305] shadow-inner border border-white/5 h-2 rounded-full overflow-hidden mb-8 relative z-10">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Title */}
      <h3 className="text-xl sm:text-2xl font-black text-white mb-8 leading-tight tracking-tight relative z-10">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-4 mb-8 relative z-10">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-white/5 border-white/10 text-slate-300 hover:border-cyan-500/50 hover:bg-white/10 backdrop-blur-md shadow-inner';
          if (selectedOpt === idx) {
            btnStyle = 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md';
          }
          if (submitted) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md';
            } else if (selectedOpt === idx) {
              btnStyle = 'bg-red-500/20 border-red-500/50 text-red-300 font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={submitted}
              className={`w-full text-left p-5 rounded-2xl border text-sm transition-all duration-300 flex items-start justify-between gap-3 ${btnStyle}`}
            >
              <span>{opt}</span>
              {submitted && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {submitted && selectedOpt === idx && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box when submitted */}
      {submitted && (
        <div className="p-6 rounded-3xl bg-[#030305]/80 border border-white/10 text-sm text-slate-300 mb-8 leading-relaxed shadow-inner backdrop-blur-md relative z-10 animate-fade-in">
          <span className="font-bold text-cyan-400 block mb-2 text-xs uppercase tracking-wider">Detailed Explanation:</span>
          {currentQ.explanation}
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-end relative z-10 border-t border-white/10 pt-6">
        {!submitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOpt === null}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            {currentIdx + 1 < quiz.questions.length ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
