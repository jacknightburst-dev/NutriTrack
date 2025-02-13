import React from 'react';
import { Activity, Target } from 'lucide-react';
import type { Meal, DailyGoals } from '../types';

interface DailyProgressProps {
  meals: Meal[];
  goals: DailyGoals;
}

export function DailyProgress({ meals, goals }: DailyProgressProps) {
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter((meal) => meal.date === today);

  const totals = todaysMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const calculateProgress = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Today's Progress</h2>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">{today}</span>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(totals).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium capitalize">{key}</span>
              <span className="text-sm text-gray-600">
                {value} / {goals[key as keyof DailyGoals]} {key === 'calories' ? 'kcal' : 'g'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${calculateProgress(value, goals[key as keyof DailyGoals])}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Daily Goals</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Calories:</span> {goals.calories} kcal
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Protein:</span> {goals.protein}g
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Carbs:</span> {goals.carbs}g
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Fat:</span> {goals.fat}g
          </div>
        </div>
      </div>
    </div>
  );
}