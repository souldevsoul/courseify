'use client';

import { useState } from 'react';
import { CourseTopicForm } from '@/components/coursify';
import { Button } from '@/components/ui/button';
import { RiArrowLeftLine, RiSparklingLine } from 'react-icons/ri';
import Link from 'next/link';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  duration: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons?: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  category?: string;
  difficultyLevel?: string;
  published: boolean;
  modules?: Module[];
}

export default function CourseBuilderPage() {
  const [step, setStep] = useState<'topic' | 'generating' | 'preview'>('topic');
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleGenerateCourse = async (data: {
    topic: string;
    category: string;
    difficulty: string;
  }) => {
    setLoading(true);
    setStep('generating');

    try {
      const response = await fetch('/api/courses/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: data.topic,
          category: data.category,
          difficultyLevel: data.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate course');
      }

      const result = await response.json();
      setCourseData(result.course);
      setStep('preview');
    } catch (error) {
      console.error('Error generating course:', error);
      toast.error('Failed to generate course. Please try again.');
      setStep('topic');
    } finally {
      setLoading(false);
    }
  };

  const handlePublishCourse = async () => {
    if (!courseData?.id) return;

    setPublishing(true);

    try {
      const response = await fetch(`/api/courses/${courseData.id}/publish`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish course');
      }

      const result = await response.json();
      setCourseData(result.course);

      // Show success message
      toast.success('Course published successfully! Students can now enroll.');

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error) {
      console.error('Error publishing course:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to publish course. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <RiArrowLeftLine className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <RiSparklingLine className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Course Builder
            </span>
          </div>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'topic' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'topic' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Topic</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-2 ${step === 'generating' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'generating' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Generating</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-2 ${step === 'preview' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'preview' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Preview</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === 'topic' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What do you want to teach?</h2>
            <p className="text-gray-600 mb-8">
              Enter your course topic and AI will generate a complete curriculum with modules and lessons.
            </p>
            <CourseTopicForm onSubmit={handleGenerateCourse} />
          </div>
        )}

        {step === 'generating' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6 animate-pulse">
              <RiSparklingLine className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generating Your Course...</h2>
            <p className="text-gray-600">AI is creating modules, lessons, and learning objectives for you.</p>
          </div>
        )}

        {step === 'preview' && courseData && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h2>
                  <p className="text-gray-600">{courseData.description}</p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {courseData.category}
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {courseData.difficultyLevel}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {courseData.modules?.length || 0} Modules
                    </span>
                  </div>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  onClick={handlePublishCourse}
                  disabled={publishing || courseData.published}
                >
                  {publishing ? 'Publishing...' : courseData.published ? 'Published' : 'Publish Course'}
                </Button>
              </div>

              {/* Course Modules */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-900">Course Curriculum</h3>
                {courseData.modules?.map((module, idx) => (
                  <div key={module.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                        <div className="space-y-2">
                          {module.lessons?.map((lesson, lessonIdx) => (
                            <div key={lesson.id} className="flex items-center gap-3 text-sm">
                              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-gray-600 font-medium text-xs">
                                {lessonIdx + 1}
                              </div>
                              <span className="text-gray-700">{lesson.title}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{lesson.duration} min</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('topic');
                    setCourseData(null);
                  }}
                  className="flex-1"
                >
                  Start Over
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  onClick={() => {
                    window.location.href = '/dashboard';
                  }}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
