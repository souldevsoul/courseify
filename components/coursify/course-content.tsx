"use client"

import { useState } from 'react'
import { RiCheckLine, RiPlayCircleLine, RiArticleLine, RiQuestionLine } from 'react-icons/ri'
import { Card } from '@/components/ui/card'
import { Text, Heading } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QuizPlayer } from '@/components/coursify/quiz-player'
import { toast } from 'sonner'

type Lesson = {
  id: string
  title: string
  content: string
  lessonType: string
  duration: number | null
  order: number
  videoUrl: string | null
  quiz?: {
    id: string
    questions: unknown
    passingScore: number
  } | null
}

type Module = {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

type Course = {
  id: string
  title: string
  description: string
  category: string
  difficultyLevel: string
  thumbnailUrl: string | null
  modules: Module[]
}

type Enrollment = {
  id: string
  completedLessons: string[]
  progress: number
}

type CourseContentProps = {
  course: Course
  enrollment: Enrollment
}

export function CourseContent({ course, enrollment }: CourseContentProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    course.modules[0]?.lessons[0] || null
  )
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(enrollment.completedLessons)
  )
  const [showQuiz, setShowQuiz] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleLessonComplete = async (lessonId: string) => {
    // Update local state immediately for better UX
    setCompletedLessons(prev => new Set([...prev, lessonId]))
    setIsSaving(true)

    try {
      // Persist to database
      const response = await fetch(`/api/enrollments/${enrollment.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      })

      if (!response.ok) {
        throw new Error('Failed to save progress')
      }
      toast.success('Lesson completed!')
    } catch (error) {
      console.error('Error saving progress:', error)
      // Revert on error
      setCompletedLessons(prev => {
        const updated = new Set(prev)
        updated.delete(lessonId)
        return updated
      })
      toast.error('Failed to save progress. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <RiCheckLine className="h-5 w-5 text-green-600" />

    switch (type) {
      case 'video':
        return <RiPlayCircleLine className="h-5 w-5 text-purple-600" />
      case 'quiz':
        return <RiQuestionLine className="h-5 w-5 text-pink-600" />
      default:
        return <RiArticleLine className="h-5 w-5 text-fuchsia-600" />
    }
  }

  // Get all lessons in order
  const allLessons = course.modules.flatMap(module => module.lessons).sort((a, b) => {
    const moduleA = course.modules.find(m => m.lessons.some(l => l.id === a.id))
    const moduleB = course.modules.find(m => m.lessons.some(l => l.id === b.id))
    if (moduleA?.order !== moduleB?.order) {
      return (moduleA?.order || 0) - (moduleB?.order || 0)
    }
    return a.order - b.order
  })

  const currentLessonIndex = allLessons.findIndex(l => l.id === selectedLesson?.id)
  const hasPrevious = currentLessonIndex > 0
  const hasNext = currentLessonIndex < allLessons.length - 1

  const goToPrevious = () => {
    if (hasPrevious) {
      setSelectedLesson(allLessons[currentLessonIndex - 1])
      setShowQuiz(false)
    }
  }

  const goToNext = () => {
    if (hasNext) {
      setSelectedLesson(allLessons[currentLessonIndex + 1])
      setShowQuiz(false)
    }
  }

  const totalLessons = allLessons.length
  const progress = Math.round((completedLessons.size / totalLessons) * 100)

  return (
    <div className="flex h-screen">
      {/* Sidebar - Course Structure */}
      <div className="w-80 bg-white border-r border-purple-200 overflow-y-auto">
        <div className="p-6 border-b border-purple-200">
          <Heading as="h2" className="text-xl font-bold mb-2">
            {course.title}
          </Heading>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default" className="bg-purple-100 text-purple-700">
              {course.category}
            </Badge>
            <Badge variant="default" className="bg-pink-100 text-pink-700">
              {course.difficultyLevel}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <Text variant="caption" className="text-slate-600">Progress</Text>
              <Text variant="caption" className="font-semibold text-purple-600">{progress}%</Text>
            </div>
            <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Text variant="caption" className="text-slate-600">
            {completedLessons.size} of {totalLessons} lessons completed
          </Text>
        </div>

        {/* Modules and Lessons */}
        <div className="p-4 space-y-4">
          {course.modules.map((module) => (
            <div key={module.id}>
              <Heading as="h3" className="text-sm font-bold mb-3 text-slate-900">
                {module.order + 1}. {module.title}
              </Heading>
              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const isCompleted = completedLessons.has(lesson.id)
                  const isSelected = selectedLesson?.id === lesson.id

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50'
                          : isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getLessonIcon(lesson.lessonType, isCompleted)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text
                            variant="body"
                            className={`font-medium text-sm ${
                              isCompleted ? 'text-green-700' : 'text-slate-900'
                            }`}
                          >
                            {lesson.title}
                          </Text>
                          {lesson.duration && (
                            <Text variant="caption" className="text-slate-500 text-xs">
                              {lesson.duration} min
                            </Text>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {selectedLesson ? (
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-6">
              <Heading as="h1" className="text-3xl font-bold mb-4">
                {selectedLesson.title}
              </Heading>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="default" className="bg-purple-100 text-purple-700">
                  {selectedLesson.lessonType}
                </Badge>
                {selectedLesson.duration && (
                  <Text variant="caption" className="text-slate-600">
                    {selectedLesson.duration} minutes
                  </Text>
                )}
              </div>
            </div>

            {/* Video Player (if video lesson) */}
            {selectedLesson.lessonType === 'video' && selectedLesson.videoUrl && (
              <Card className="mb-8 p-4 border-2 border-purple-200">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                  <Text variant="body" className="text-white">
                    Video Player Placeholder
                  </Text>
                </div>
              </Card>
            )}

            {/* Lesson Content */}
            <Card className="mb-8 p-8 border-2 border-purple-200">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedLesson.content.replace(/\n/g, '<br />') }}
              />
            </Card>

            {/* Quiz Section */}
            {selectedLesson.quiz && (
              <Card className="mb-8 p-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
                <Heading as="h3" className="text-xl font-bold mb-4">
                  Quiz
                </Heading>
                {!showQuiz ? (
                  <>
                    <Text variant="body" className="text-slate-700 mb-4">
                      Test your knowledge with this quiz. Passing score: {selectedLesson.quiz.passingScore}%
                    </Text>
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    >
                      Start Quiz
                    </Button>
                  </>
                ) : (
                  <QuizPlayer
                    questions={
                      Array.isArray(selectedLesson.quiz.questions)
                        ? selectedLesson.quiz.questions
                        : []
                    }
                    passingScore={selectedLesson.quiz.passingScore}
                    onComplete={(score, passed) => {
                      if (passed) {
                        handleLessonComplete(selectedLesson.id)
                      }
                      setShowQuiz(false)
                    }}
                  />
                )}
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                variant="outline"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Lesson
              </Button>

              {!completedLessons.has(selectedLesson.id) && (
                <Button
                  onClick={() => handleLessonComplete(selectedLesson.id)}
                  disabled={isSaving}
                  className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Mark as Complete'}
                </Button>
              )}

              <Button
                onClick={goToNext}
                disabled={!hasNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Lesson
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Heading as="h2" className="text-2xl font-bold text-slate-900 mb-2">
                Select a lesson to begin
              </Heading>
              <Text variant="body" className="text-slate-600">
                Choose a lesson from the sidebar to start learning
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
