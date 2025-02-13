import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { MealForm } from './components/MealForm';
import { MealList } from './components/MealList';
import { DailyProgress } from './components/DailyProgress';
import type { Meal, DailyGoals } from './types';

const defaultGoals: DailyGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleAddMeal = (meal: Meal) => {
    setMeals([...meals, meal]);
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Utensils className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">NutriTrack</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MealForm onAddMeal={handleAddMeal} />
            <MealList meals={meals} onDeleteMeal={handleDeleteMeal} />
          </div>
          <div>
            <DailyProgress meals={meals} goals={defaultGoals} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;