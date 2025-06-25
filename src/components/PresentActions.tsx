"use client";

import { useState } from 'react';

interface PresentActionsProps {
  budgetShift: number;
  goalROAS: number;
  onBudgetShiftChange: (value: number) => void;
  onGoalROASChange: (value: number) => void;
}

export default function PresentActions({
  budgetShift,
  goalROAS,
  onBudgetShiftChange,
  onGoalROASChange,
}: PresentActionsProps) {
  return (
    <div className="space-y-6">
      {/* Budget Shift Slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Budget Shift: {budgetShift}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={budgetShift}
          onChange={(e) => onBudgetShiftChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Goal ROAS Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Target ROAS
        </label>
        <input
          type="number"
          min="0.1"
          max="10"
          step="0.1"
          value={goalROAS}
          onChange={(e) => onGoalROASChange(Number(e.target.value))}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="2.0"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => {
            console.log('Apply changes:', { budgetShift, goalROAS });
          }}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Apply Changes
        </button>
        <button
          onClick={() => {
            console.log('Reset to defaults');
          }}
          className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
} 