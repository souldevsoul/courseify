'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  RiBookLine,
  RiGroupLine,
  RiArrowRightLine,
} from "react-icons/ri"
import { Card } from "@/components/ui/card"
import { Text, Heading } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { CourseList, CourseCardSkeletonGrid } from "@/components/coursify"

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

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0 })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Failed to fetch courses')

      const data = await response.json()
      const userCourses = data.courses || []

      setCourses(userCourses)

      // Calculate stats
      const totalStudents = userCourses.reduce(
        (sum: number, course: Course) => sum + (course._count?.enrollments || 0),
        0
      )

      setStats({
        totalCourses: userCourses.length,
        totalStudents,
      })
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCourseDeleted = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId))
    setStats(prev => ({
      totalCourses: prev.totalCourses - 1,
      totalStudents: prev.totalStudents,
    }))
  }

  const handleCoursePublishToggled = (courseId: string, published: boolean) => {
    setCourses(prev =>
      prev.map(c => c.id === courseId ? { ...c, published } : c)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Heading as="h1" className="mb-2 text-4xl font-bold">
            Dashboard
          </Heading>
          <Text variant="body" className="text-slate-600">
            Manage your courses and students
          </Text>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-purple-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="caption" className="mb-2 text-slate-600">
                  Total Courses
                </Text>
                <Heading as="h2" className="text-4xl font-bold text-purple-600">
                  {stats.totalCourses}
                </Heading>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <RiBookLine className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="border-2 border-pink-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="caption" className="mb-2 text-slate-600">
                  Total Students
                </Text>
                <Heading as="h2" className="text-4xl font-bold text-pink-600">
                  {stats.totalStudents}
                </Heading>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                <RiGroupLine className="h-8 w-8 text-pink-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-purple-200 bg-white p-8 shadow-lg">
          <Heading as="h3" className="mb-6 text-2xl font-bold">
            Quick Actions
          </Heading>
          <div className="flex justify-center">
            <Link href="/builder">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
              >
                Create New Course
                <RiArrowRightLine className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* My Courses */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <Heading as="h3" className="text-2xl font-bold">
              My Courses
            </Heading>
            {courses.length > 0 && (
              <Link href="/builder">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Create New
                </Button>
              </Link>
            )}
          </div>

          {loading ? (
            <CourseCardSkeletonGrid count={3} />
          ) : (
            <CourseList
              courses={courses}
              onDelete={handleCourseDeleted}
              onTogglePublish={handleCoursePublishToggled}
            />
          )}
        </div>
      </div>
    </div>
  )
}
