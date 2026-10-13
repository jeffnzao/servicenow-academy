export interface UserProgress {
  completedCourses: string[];
  validatedExercises: string[];
  xp: number;
}

const STORAGE_KEY = 'sn_academy_progress';

export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { completedCourses: [], validatedExercises: [], xp: 0 };
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { completedCourses: [], validatedExercises: [], xp: 0 };
  }
  try {
    return JSON.parse(saved);
  } catch {
    return { completedCourses: [], validatedExercises: [], xp: 0 };
  }
}

export function saveCourseProgress(courseId: string): UserProgress {
  const progress = getUserProgress();
  if (!progress.completedCourses.includes(courseId)) {
    progress.completedCourses.push(courseId);
    progress.xp += 10; // +10 XP par cours lu
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  return progress;
}

export function saveExerciseProgress(exerciseId: string): UserProgress {
  const progress = getUserProgress();
  if (!progress.validatedExercises.includes(exerciseId)) {
    progress.validatedExercises.push(exerciseId);
    progress.xp += 25; // +25 XP par atelier validé
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  return progress;
}