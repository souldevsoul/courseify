import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CourseContent } from '@/components/coursify/course-content'
import { EnrollButton } from '@/components/coursify/enroll-button'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Text, Heading } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const course = await prisma.course.findUnique({
    where: { id },
    select: { title: true, description: true },
  })

  if (!course) {
    return {
      title: 'Course Not Found - Coursify',
    }
  }

  return {
    title: `${course.title} - Coursify`,
    description: course.description,
  }
}

async function getCourseWithEnrollment(courseId: string, userId: string | null) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      modules: {
        include: {
          lessons: {
            include: {
              quiz: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  if (!course) {
    return null
  }

  let enrollment = null
  if (userId) {
    enrollment = await prisma.enrollment.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId,
        },
      },
    })
  }

  return { course, enrollment }
}

export default async function CoursePage({ params }: Props) {
  const { id } = await params
  const session = await getSession()
  const userId = session?.user?.id || null

  const data = await getCourseWithEnrollment(id, userId)

  if (!data || !data.course) {
    notFound()
  }

  const { course, enrollment } = data
  const isEnrolled = !!enrollment

  // If enrolled, show course content
  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CourseContent course={course} enrollment={enrollment!} />
      </div>
    )
  }

  // If not enrolled, show course preview with enroll button
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default" className="bg-purple-100 text-purple-700">
              {course.category}
            </Badge>
            <Badge variant="default" className="bg-pink-100 text-pink-700">
              {course.difficultyLevel}
            </Badge>
          </div>

          <Heading as="h1" className="text-4xl font-bold mb-4">
            {course.title}
          </Heading>

          <Text variant="body" className="text-slate-600 text-lg mb-6">
            {course.description}
          </Text>

          <div className="flex items-center gap-4">
            <EnrollButton courseId={course.id} isEnrolled={false} userId={userId} />
            {course.user && (
              <Text variant="body" className="text-slate-600">
                By {course.user.name || course.user.email}
              </Text>
            )}
          </div>
        </div>

        {/* Course Structure Preview */}
        <Card className="border-2 border-purple-200 p-8">
          <Heading as="h2" className="text-2xl font-bold mb-6">
            Course Content
          </Heading>

          <div className="space-y-6">
            {course.modules.map((module, idx) => (
              <div key={module.id} className="border-l-4 border-purple-500 pl-6">
                <Heading as="h3" className="text-lg font-bold mb-3">
                  Module {idx + 1}: {module.title}
                </Heading>
                <Text variant="body" className="text-slate-600 mb-4">
                  {module.description}
                </Text>
                <ul className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      {lesson.title}
                      {lesson.duration && (
                        <span className="ml-auto text-sm text-slate-500">
                          {lesson.duration} min
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
