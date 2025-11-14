'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RiBookOpenLine, RiArrowRightLine, RiTimeLine } from 'react-icons/ri'
import { Card } from '@/components/ui/card'
import { Text, Heading } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MyCourseCardSkeletonGrid } from '@/components/coursify'

type Enrollment = {
  id: string
  progress: number
  enrolledAt: string
  completedAt: string | null
  course: {
    id: string
    title: string
    description: string
    category: string
    difficultyLevel: string
    thumbnailUrl: string | null
    modules: {
      id: string
      lessons: {
        id: string
      }[]
    }[]
  }
}

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    fetchUserAndEnrollments()
  }, [])

  const fetchUserAndEnrollments = async () => {
    try {
      // Get current user
      const userResponse = await fetch('/api/users/me')
      if (!userResponse.ok) {
        window.location.href = '/auth/signin?callbackUrl=/my-courses'
        return
      }

      const userData = await userResponse.json()
      setUserId(userData.user.id)

      // Get enrollments
      const enrollmentsResponse = await fetch(`/api/enrollments?userId=${userData.user.id}`)
      if (!enrollmentsResponse.ok) throw new Error('Failed to fetch enrollments')

      const enrollmentsData = await enrollmentsResponse.json()
      setEnrollments(enrollmentsData.enrollments || [])
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTotalLessons = (course: Enrollment['course']) => {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Heading as="h1" className="mb-2 text-4xl font-bold">
            My Courses
          </Heading>
          <Text variant="body" className="text-slate-600">
            Continue your learning journey
          </Text>
        </div>

        {loading ? (
          <MyCourseCardSkeletonGrid count={6} />
        ) : enrollments.length === 0 ? (
          <Card className="border-2 border-purple-200 bg-white p-12 text-center">
            <div className="flex h-24 w-24 mx-auto mb-6 items-center justify-center rounded-full bg-purple-100">
              <RiBookOpenLine className="h-12 w-12 text-purple-600" />
            </div>
            <Heading as="h3" className="text-2xl font-bold mb-4">
              No courses yet
            </Heading>
            <Text variant="body" className="text-slate-600 mb-6">
              Explore our course catalog and start learning today
            </Text>
            <Link href="/courses">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Browse Courses
                <RiArrowRightLine className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => {
              const totalLessons = getTotalLessons(enrollment.course)
              const isCompleted = enrollment.completedAt !== null

              return (
                <Card
                  key={enrollment.id}
                  className="border-2 border-purple-200 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Course Thumbnail */}
                  {enrollment.course.thumbnailUrl ? (
                    <div className="w-full h-40 relative rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={enrollment.course.thumbnailUrl}
                        alt={enrollment.course.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                      <RiBookOpenLine className="h-16 w-16 text-white" />
                    </div>
                  )}

                  {/* Course Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default" className="bg-purple-100 text-purple-700 text-xs">
                        {enrollment.course.category}
                      </Badge>
                      <Badge variant="default" className="bg-pink-100 text-pink-700 text-xs">
                        {enrollment.course.difficultyLevel}
                      </Badge>
                      {isCompleted && (
                        <Badge variant="default" className="bg-green-100 text-green-700 text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>

                    <Heading as="h3" className="text-lg font-bold mb-2 line-clamp-2">
                      {enrollment.course.title}
                    </Heading>

                    <Text variant="body" className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {enrollment.course.description}
                    </Text>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <Text variant="caption" className="text-slate-600">
                          Progress
                        </Text>
                        <Text variant="caption" className="font-semibold text-purple-600">
                          {enrollment.progress}%
                        </Text>
                      </div>
                      <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <RiTimeLine className="h-4 w-4 text-slate-400" />
                        <Text variant="caption" className="text-slate-500 text-xs">
                          Enrolled {formatDate(enrollment.enrolledAt)}
                        </Text>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/courses/${enrollment.course.id}`}>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        size="sm"
                      >
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                        <RiArrowRightLine className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Browse More Courses */}
        {enrollments.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Browse More Courses
                <RiArrowRightLine className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
