"use client"

import { useState } from 'react'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { Card } from '@/components/ui/card'
import { Text, Heading } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

type QuizPlayerProps = {
  questions: QuizQuestion[]
  passingScore: number
  onComplete: (score: number, passed: boolean) => void
}

export function QuizPlayer({ questions, passingScore, onComplete }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowExplanation(true)
    setAnswers([...answers, selectedAnswer])
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      const allAnswers = [...answers, selectedAnswer!]
      const correctCount = allAnswers.filter(
        (answer, idx) => answer === questions[idx].correctAnswer
      ).length
      const score = Math.round((correctCount / questions.length) * 100)
      const passed = score >= passingScore

      setQuizCompleted(true)
      onComplete(score, passed)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  if (quizCompleted) {
    const allAnswers = [...answers, selectedAnswer!]
    const correctCount = allAnswers.filter(
      (answer, idx) => answer === questions[idx].correctAnswer
    ).length
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= passingScore

    return (
      <Card className={`border-2 p-8 ${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="text-center">
          {passed ? (
            <div className="mb-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600 mb-4">
                <RiCheckLine className="h-10 w-10 text-white" />
              </div>
              <Heading as="h2" className="text-2xl font-bold text-green-900 mb-2">
                Congratulations!
              </Heading>
              <Text variant="body" className="text-green-800">
                You passed the quiz with {score}%
              </Text>
            </div>
          ) : (
            <div className="mb-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 mb-4">
                <RiCloseLine className="h-10 w-10 text-white" />
              </div>
              <Heading as="h2" className="text-2xl font-bold text-red-900 mb-2">
                Not Quite There
              </Heading>
              <Text variant="body" className="text-red-800">
                You scored {score}%. Passing score is {passingScore}%
              </Text>
            </div>
          )}

          <div className="mb-6">
            <Text variant="body" className="text-slate-700">
              You answered {correctCount} out of {questions.length} questions correctly
            </Text>
          </div>

          {!passed && (
            <Button
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswer(null)
                setShowExplanation(false)
                setAnswers([])
                setQuizCompleted(false)
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              Try Again
            </Button>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4">
        <Text variant="caption" className="text-slate-600">
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text variant="caption" className="text-slate-600">
          Passing Score: {passingScore}%
        </Text>
      </div>

      <div className="h-2 bg-purple-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card className="border-2 border-purple-200 p-8">
        <Heading as="h3" className="text-xl font-bold mb-6">
          {question.question}
        </Heading>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const isCorrectOption = idx === question.correctAnswer
            const showCorrect = showExplanation && isCorrectOption
            const showIncorrect = showExplanation && isSelected && !isCorrect

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-600 bg-green-50'
                    : showIncorrect
                    ? 'border-red-600 bg-red-50'
                    : isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <Text variant="body" className="font-medium">
                    {option}
                  </Text>
                  {showCorrect && <RiCheckLine className="h-6 w-6 text-green-600 flex-shrink-0" />}
                  {showIncorrect && <RiCloseLine className="h-6 w-6 text-red-600 flex-shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <Card className="border-2 border-purple-200 bg-purple-50 p-4 mb-4">
            <Text variant="body" className="text-purple-900 font-medium mb-2">
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>
            <Text variant="body" className="text-purple-800">
              {question.explanation}
            </Text>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
