export interface Exercise {
  id: string;
  courseId: string;
  title: string;
  level: string;
  scenario: string;
  prerequisites: string[];
  instructions: string[];
  pdiSteps: string[];
  initialCode?: string;
  solutionCode: string;
  validationType: 'static_code' | 'pdi_checklist' | 'simulation';
  successCriteria: string[];
  hints: string[];
}