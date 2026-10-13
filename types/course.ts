export type CourseLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Senior';
export type CourseCategory = 'Client' | 'Serveur' | 'Architecture' | 'Intégration' | 'Fonctionnel';

export interface CourseSection {
  title: string;
  content: string;
  codeExample?: string;
  bestPractices?: string[];
  pitfalls?: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  description: string;
  objectives: string[];
  sections: CourseSection[];
  officialLinks?: { title: string; url: string }[];
  relatedExerciseId?: string;
}