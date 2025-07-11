"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PresentActions from './PresentActions';

interface MockBrief {
  recommendationsMd: string;
  budgetShift: number;
  goalROAS: number;
}

export default function PresentPanel() {
  const [brief, setBrief] = useState<MockBrief | null>(null);
  const [budgetShift, setBudgetShift] = useState(25);
  const [goalROAS, setGoalROAS] = useState(2.0);

  useEffect(() => {
    // Load mock data
    const loadMockData = async () => {
      try {
        const response = await fetch('/api/mock-brief');
        const data = await response.json();
        setBrief(data);
        setBudgetShift(data.budgetShift);
        setGoalROAS(data.goalROAS);
      } catch (error) {
        console.error('Failed to load mock data:', error);
        // Fallback to default values
        setBrief({
          recommendationsMd: "# Current Performance Analysis\n\n## Key Insights\n\nYour campaign is showing **strong engagement** but **ROAS is below target** at 1.2x vs. 2.0x goal.\n\n## Recommendations\n\n1. **Increase budget allocation** to top-performing ad sets by 25%\n2. **Optimize bidding strategy** for better conversion rates\n3. **Test new creative variations** to improve CTR",
          budgetShift: 25,
          goalROAS: 2.0
        });
      }
    };

    loadMockData();
  }, []);

  if (!brief) {
    return (
      <section className="flex flex-col gap-4 bg-glass-dark backdrop-blur rounded-2xl shadow-glass">
        <div className="animate-pulse">
          <div className="h-6 bg-glass-dark rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-glass-dark rounded"></div>
            <div className="h-4 bg-glass-dark rounded w-3/4"></div>
            <div className="h-4 bg-glass-dark rounded w-1/2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 bg-glass-dark backdrop-blur rounded-2xl shadow-glass">
      <h2 className="text-xl font-semibold text-white">Present Panel</h2>
      
      {/* Report & Recommendations */}
      <div className="bg-glass-dark rounded-lg p-4 overflow-y-auto">
        <div className="prose prose-invert prose-sm max-w-none present-panel-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{brief.recommendationsMd}</ReactMarkdown>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-glass-dark rounded-lg p-4">
        <PresentActions
          budgetShift={budgetShift}
          goalROAS={goalROAS}
          onBudgetShiftChange={setBudgetShift}
          onGoalROASChange={setGoalROAS}
        />
      </div>
    </section>
  );
} 