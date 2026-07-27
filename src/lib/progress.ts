// User progress and completion tracking helper

export interface UserProgress {
  completedLessons: string[]; // e.g. ["m1-l1", "m1-l2"]
  completedModules: string[]; // e.g. ["m1", "m2"]
  quizScores: Record<string, number>; // e.g. { "m1": 100, "m2": 85 }
  bookmarkedLessons: string[];
  lastVisitedModule?: string;
  certificateEarned?: boolean;
}

const PROGRESS_KEY = 'printer_op_training_progress';

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return {
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      bookmarkedLessons: [],
    };
  }
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      return {
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        bookmarkedLessons: [],
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      bookmarkedLessons: [],
    };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function toggleLessonComplete(lessonId: string, moduleId: string, totalLessonsInModule: number): UserProgress {
  const p = getProgress();
  const index = p.completedLessons.indexOf(lessonId);
  
  if (index > -1) {
    p.completedLessons.splice(index, 1);
  } else {
    p.completedLessons.push(lessonId);
  }

  // Check if all lessons in module are complete
  const moduleLessonPrefix = `${moduleId}-`;
  const completedInModule = p.completedLessons.filter(id => id.startsWith(moduleLessonPrefix)).length;
  
  if (completedInModule >= totalLessonsInModule) {
    if (!p.completedModules.includes(moduleId)) {
      p.completedModules.push(moduleId);
    }
  } else {
    p.completedModules = p.completedModules.filter(m => m !== moduleId);
  }

  saveProgress(p);
  return p;
}

export function saveQuizScore(moduleId: string, scorePercentage: number): UserProgress {
  const p = getProgress();
  p.quizScores[moduleId] = scorePercentage;
  saveProgress(p);
  return p;
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
}
