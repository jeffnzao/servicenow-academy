'use client';

import { useState } from 'react';
import { CheckSquare, Square, CheckCircle2 } from 'lucide-react';

interface ExerciseChecklistProps {
  steps: string[];
}

export default function ExerciseChecklist({ steps }: ExerciseChecklistProps) {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (checkedSteps.includes(index)) {
      setCheckedSteps(checkedSteps.filter((i) => i !== index));
    } else {
      setCheckedSteps([...checkedSteps, index]);
    }
  };

  const progressPercentage = Math.round((checkedSteps.length / steps.length) * 100);

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <CheckCircle2 size={18} className="text-blue-400" />
          <span>Checklist de validation sur PDI</span>
        </h3>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
          {checkedSteps.length} / {steps.length} complétées ({progressPercentage}%)
        </span>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="space-y-2.5">
        {steps.map((step, index) => {
          const isChecked = checkedSteps.includes(index);
          return (
            <div
              key={index}
              onClick={() => toggleStep(index)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                isChecked 
                  ? 'bg-blue-950/20 border-blue-800/50 text-gray-300 line-through opacity-75' 
                  : 'bg-[#0d1117] border-gray-800 text-white hover:border-gray-700'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-blue-400">
                {isChecked ? <CheckSquare size={18} /> : <Square size={18} className="text-gray-500" />}
              </div>
              <span className="text-xs leading-relaxed font-mono">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}