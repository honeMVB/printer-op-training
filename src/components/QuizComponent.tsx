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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-2xl">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl ${
          passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
        }`}>
          <Award className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {passed ? 'Module Assessment Passed!' : 'Assessment Retake Suggested'}
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          You scored <span className="text-cyan-400 font-bold text-xl">{score}%</span> on the {quiz.moduleTitle} knowledge test.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Assessment</span>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Question {currentIdx + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-cyan-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Title */}
      <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800';
          if (selectedOpt === idx) {
            btnStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold shadow-lg shadow-cyan-500/10';
          }
          if (submitted) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
            } else if (selectedOpt === idx) {
              btnStyle = 'bg-red-500/20 border-red-500 text-red-300 font-semibold';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
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
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 mb-6 leading-relaxed">
          <span className="font-bold text-cyan-400 block mb-1">Detailed Explanation:</span>
          {currentQ.explanation}
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-end">
        {!submitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOpt === null}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            {currentIdx + 1 < quiz.questions.length ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
