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
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-10 text-center max-w-xl mx-auto shadow-sm">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 border ${
          passed ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'
        }`}>
          <Award className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mb-2 tracking-tight">
          {passed ? 'Module Assessment Passed!' : 'Assessment Retake Suggested'}
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-base mb-8">
          You scored <span className="text-stone-900 dark:text-stone-100 font-bold text-2xl mx-1">{score}%</span> on the {quiz.moduleTitle} knowledge test.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-300 font-medium transition-colors border border-stone-200 dark:border-stone-700"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto shadow-sm">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-5 mb-8">
        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-stone-500" />
          <span>Knowledge Assessment</span>
        </div>
        <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full">
          Question {currentIdx + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-stone-900 dark:bg-stone-100 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 mb-8 leading-tight tracking-tight">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-4 mb-8">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900';
          if (selectedOpt === idx) {
            btnStyle = 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-50 font-medium';
          }
          if (submitted) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/50 text-teal-800 dark:text-teal-300 font-medium';
            } else if (selectedOpt === idx) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 font-medium';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-colors flex items-start justify-between gap-3 ${btnStyle}`}
            >
              <span className="leading-relaxed">{opt}</span>
              {submitted && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-500 shrink-0 mt-0.5" />
              )}
              {submitted && selectedOpt === idx && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-500 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box when submitted */}
      {submitted && (
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm text-stone-700 dark:text-stone-300 mb-8 leading-relaxed">
          <span className="font-semibold text-stone-900 dark:text-stone-100 block mb-2 text-xs uppercase tracking-wider">Detailed Explanation:</span>
          {currentQ.explanation}
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-end border-t border-stone-200 dark:border-stone-800 pt-6">
        {!submitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOpt === null}
            className="px-6 py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 font-medium text-sm transition-colors"
          >
            {currentIdx + 1 < quiz.questions.length ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
