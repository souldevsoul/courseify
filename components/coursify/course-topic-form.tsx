'use client';

import { useState } from 'react';

interface CourseTopicFormProps {
  onSubmit?: (data: {
    topic: string;
    category: string;
    difficulty: string;
  }) => void;
}

export function CourseTopicForm({ onSubmit }: CourseTopicFormProps) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('business');
  const [difficulty, setDifficulty] = useState('beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ topic, category, difficulty });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
          Course Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Introduction to Web Development"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="creative">Creative</option>
          <option value="personal-development">Personal Development</option>
          <option value="health">Health & Wellness</option>
          <option value="education">Education</option>
        </select>
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Level
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-fuchsia-700 transition-all"
      >
        Generate Course Structure
      </button>
    </form>
  );
}
