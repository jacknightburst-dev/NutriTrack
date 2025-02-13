import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Meal } from '../types';

interface MealListProps {
  meals: Meal[];
  onDeleteMeal: (id: string) => void;
}

export function MealList({ meals, onDeleteMeal }: MealListProps) {
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter((meal) => meal.date === today);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
      <div className="space-y-4">
        {todaysMeals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No meals logged today</p>
        ) : (
          todaysMeals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium">{meal.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span>{meal.calories} kcal</span> •{' '}
                  <span>{meal.protein}g protein</span> •{' '}
                  <span>{meal.carbs}g carbs</span> •{' '}
                  <span>{meal.fat}g fat</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{meal.time}</div>
              </div>
              <button
                onClick={() => onDeleteMeal(meal.id)}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}