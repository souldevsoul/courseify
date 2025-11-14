"use client"

import { useState } from 'react'
import Link from 'next/link'
import { RiEditLine, RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { Card } from '@/components/ui/card'
import { Text, Heading } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

type Course = {
  id: string
  title: string
  description: string
  category: string
  difficultyLevel: string
  published: boolean
  _count?: {
    enrollments: number
    modules: number
  }
}

type CourseListProps = {
  courses: Course[]
  onDelete?: (courseId: string) => void
  onTogglePublish?: (courseId: string, published: boolean) => void
}

export function CourseList({ courses, onDelete, onTogglePublish }: CourseListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return
    }

    setDeletingId(courseId)

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete course')
      }

      if (onDelete) {
        onDelete(courseId)
      }
      toast.success('Course deleted successfully')
    } catch (error) {
      console.error('Error deleting course:', error)
      toast.error('Failed to delete course. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleTogglePublish = async (courseId: string, currentPublished: boolean) => {
    setTogglingId(courseId)

    try {
      const endpoint = currentPublished
        ? `/api/courses/${courseId}/publish`
        : `/api/courses/${courseId}/publish`

      const method = currentPublished ? 'DELETE' : 'POST'

      const response = await fetch(endpoint, { method })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update course')
      }

      if (onTogglePublish) {
        onTogglePublish(courseId, !currentPublished)
      }
      toast.success(currentPublished ? 'Course unpublished' : 'Course published successfully')
    } catch (error) {
      console.error('Error toggling publish:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update course. Please try again.')
    } finally {
      setTogglingId(null)
    }
  }

  if (courses.length === 0) {
    return (
      <Card className="border-2 border-purple-200 bg-white p-12 text-center">
        <Heading as="h3" className="text-xl font-bold mb-4">
          No courses yet
        </Heading>
        <Text variant="body" className="text-slate-600 mb-6">
          Create your first AI-powered course to get started
        </Text>
        <Link href="/builder">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
            Create Course
          </Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id} className="border-2 border-purple-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Heading as="h3" className="text-xl font-bold">
                  {course.title}
                </Heading>
                <Badge
                  variant="default"
                  className={course.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                >
                  {course.published ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <Text variant="body" className="text-slate-600 mb-4 line-clamp-2">
                {course.description}
              </Text>

              <div className="flex items-center gap-4 mb-4">
                <Badge variant="default" className="bg-purple-100 text-purple-700">
                  {course.category}
                </Badge>
                <Badge variant="default" className="bg-pink-100 text-pink-700">
                  {course.difficultyLevel}
                </Badge>
                {course._count && (
                  <>
                    <Text variant="caption" className="text-slate-600">
                      {course._count.modules} modules
                    </Text>
                    <Text variant="caption" className="text-slate-600">
                      {course._count.enrollments} students
                    </Text>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/courses/${course.id}`}>
                  <Button variant="outline" size="sm" className="border-purple-300 text-purple-700">
                    <RiEyeLine className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-700"
                  onClick={() => handleTogglePublish(course.id, course.published)}
                  disabled={togglingId === course.id}
                >
                  {togglingId === course.id ? (
                    'Updating...'
                  ) : course.published ? (
                    <>
                      <RiEyeOffLine className="mr-2 h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <RiEyeLine className="mr-2 h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(course.id)}
                  disabled={deletingId === course.id}
                >
                  <RiDeleteBinLine className="mr-2 h-4 w-4" />
                  {deletingId === course.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
