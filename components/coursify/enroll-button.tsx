"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RiCheckLine, RiLoader4Line } from 'react-icons/ri'
import { toast } from 'sonner'

type EnrollButtonProps = {
  courseId: string
  isEnrolled: boolean
  userId: string | null
}

export function EnrollButton({ courseId, isEnrolled, userId }: EnrollButtonProps) {
  const router = useRouter()
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(isEnrolled)

  const handleEnroll = async () => {
    if (!userId) {
      // Redirect to signin with callback
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}`)
      return
    }

    setIsEnrolling(true)

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to enroll')
      }

      setEnrolled(true)
      toast.success('Successfully enrolled in course!')
      router.refresh()
    } catch (error) {
      console.error('Enrollment error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to enroll in course')
    } finally {
      setIsEnrolling(false)
    }
  }

  if (enrolled) {
    return (
      <Button
        disabled
        className="bg-green-600 text-white border-2 border-green-700 cursor-not-allowed"
        size="lg"
      >
        <RiCheckLine className="mr-2 h-5 w-5" />
        Enrolled
      </Button>
    )
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={isEnrolling}
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
      size="lg"
    >
      {isEnrolling ? (
        <>
          <RiLoader4Line className="mr-2 h-5 w-5 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>Enroll in Course</>
      )}
    </Button>
  )
}
