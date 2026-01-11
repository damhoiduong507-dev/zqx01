
import React from 'react';
import { RoadmapStep } from '../types';

interface StepCardProps {
  step: RoadmapStep;
  isActive: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 p-6 rounded-2xl border-2 ${
        isActive 
          ? 'bg-white border-blue-500 shadow-xl scale-105' 
          : 'bg-white/50 border-transparent hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
        isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
      }`}>
        <i className={`fas ${step.icon} text-xl`}></i>
      </div>
      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.description}</p>
      
      {isActive && (
        <ul className="space-y-2">
          {step.tasks.map((task, idx) => (
            <li key={idx} className="flex items-center text-xs text-slate-700">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StepCard;
