import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RiBookLine, RiTimeLine, RiUserLine } from 'react-icons/ri'
import { Card } from '@/components/ui/card'
import { Text, Heading } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Browse Courses - Coursify',
  description: 'Explore AI-powered courses and start learning today',
}

async function getCourses() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    // Fetch only published courses for the public catalog
    const response = await fetch(`${baseUrl}/api/courses?published=true`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.courses || []
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-purple-200">
        <div className="container mx-auto px-4 py-12">
          <Heading as="h1" className="text-4xl font-bold mb-4">
            Browse Courses
          </Heading>
          <Text variant="body" className="text-slate-600 max-w-2xl">
            Explore our collection of AI-powered courses. Learn at your own pace with interactive lessons, quizzes, and comprehensive content.
          </Text>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-12">
        {courses.length === 0 ? (
          <Card className="border-2 border-purple-200 p-12 text-center">
            <Heading as="h2" className="text-2xl font-bold mb-4">
              No courses available yet
            </Heading>
            <Text variant="body" className="text-slate-600 mb-6">
              Start creating your first AI-powered course today!
            </Text>
            <Link href="/builder">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Create Course
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: { id: string; title: string; description: string; thumbnailUrl?: string; category?: string; difficultyLevel?: string; user?: { name?: string; email?: string }; modules?: { lessons?: { duration?: number }[] }[] }) => {
              const totalLessons = course.modules?.reduce(
                (acc, module) => acc + (module.lessons?.length || 0),
                0
              ) || 0

              const totalDuration = course.modules?.reduce(
                (acc, module) =>
                  acc +
                  (module.lessons?.reduce(
                    (sum, lesson) => sum + (lesson.duration || 0),
                    0
                  ) || 0),
                0
              ) || 0

              return (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer h-full overflow-hidden group">
                    {/* Thumbnail */}
                    {course.thumbnailUrl ? (
                      <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden relative">
                        <Image
                          src={course.thumbnailUrl}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                        <RiBookLine className="h-16 w-16 text-purple-600" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="default" className="bg-purple-100 text-purple-700">
                          {course.category}
                        </Badge>
                        <Badge variant="default" className="bg-pink-100 text-pink-700">
                          {course.difficultyLevel}
                        </Badge>
                      </div>

                      <Heading as="h3" className="text-xl font-bold mb-2 line-clamp-2">
                        {course.title}
                      </Heading>

                      <Text variant="body" className="text-slate-600 mb-4 line-clamp-3">
                        {course.description}
                      </Text>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <RiBookLine className="h-4 w-4" />
                          <span>{totalLessons} lessons</span>
                        </div>
                        {totalDuration > 0 && (
                          <div className="flex items-center gap-1">
                            <RiTimeLine className="h-4 w-4" />
                            <span>{Math.round(totalDuration / 60)}h</span>
                          </div>
                        )}
                      </div>

                      {/* Author */}
                      {course.user && (
                        <div className="mt-4 pt-4 border-t border-purple-100 flex items-center gap-2">
                          <RiUserLine className="h-4 w-4 text-slate-500" />
                          <Text variant="caption" className="text-slate-600">
                            {course.user.name || course.user.email}
                          </Text>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
