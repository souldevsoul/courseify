import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const user = await requireAuth()
    const { courseId } = await params

    // Get course with full data
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { order: "asc" },
        },
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { enrolledAt: "desc" },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check authorization
    if (course.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Calculate analytics
    const totalEnrollments = course.enrollments.length
    const totalLessons = course.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    )

    // Calculate average progress
    const averageProgress =
      totalEnrollments > 0
        ? course.enrollments.reduce((sum, e) => sum + e.progress, 0) /
          totalEnrollments
        : 0

    // Count completed enrollments
    const completedEnrollments = course.enrollments.filter(
      (e) => e.completedAt !== null
    ).length

    const completionRate =
      totalEnrollments > 0
        ? (completedEnrollments / totalEnrollments) * 100
        : 0

    // Calculate lesson popularity (how many students completed each lesson)
    const lessonPopularity = new Map<string, number>()
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        let completedCount = 0
        course.enrollments.forEach((enrollment) => {
          if (enrollment.completedLessons.includes(lesson.id)) {
            completedCount++
          }
        })
        lessonPopularity.set(lesson.id, completedCount)
      })
    })

    // Find most and least popular lessons
    const lessonStats = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        moduleTitle: module.title,
        completedBy: lessonPopularity.get(lesson.id) || 0,
        completionRate:
          totalEnrollments > 0
            ? ((lessonPopularity.get(lesson.id) || 0) / totalEnrollments) * 100
            : 0,
      }))
    )

    lessonStats.sort((a, b) => b.completedBy - a.completedBy)

    const mostPopularLessons = lessonStats.slice(0, 5)
    const leastPopularLessons = lessonStats.slice(-5).reverse()

    // Recent enrollments
    const recentEnrollments = course.enrollments.slice(0, 10).map((e) => ({
      id: e.id,
      userName: e.user.name || e.user.email,
      enrolledAt: e.enrolledAt,
      progress: e.progress,
      completed: e.completedAt !== null,
    }))

    // Enrollment trend (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const enrollmentTrend = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      const dateStr = date.toISOString().split("T")[0]

      const enrollmentsOnDay = course.enrollments.filter((e) => {
        const enrollDate = new Date(e.enrolledAt).toISOString().split("T")[0]
        return enrollDate === dateStr
      }).length

      return {
        date: dateStr,
        enrollments: enrollmentsOnDay,
      }
    })

    // Progress distribution
    const progressBuckets = {
      "0-25%": 0,
      "26-50%": 0,
      "51-75%": 0,
      "76-99%": 0,
      "100%": 0,
    }

    course.enrollments.forEach((e) => {
      if (e.progress === 0) progressBuckets["0-25%"]++
      else if (e.progress <= 25) progressBuckets["0-25%"]++
      else if (e.progress <= 50) progressBuckets["26-50%"]++
      else if (e.progress <= 75) progressBuckets["51-75%"]++
      else if (e.progress < 100) progressBuckets["76-99%"]++
      else progressBuckets["100%"]++
    })

    return NextResponse.json({
      course: {
        id: course.id,
        title: course.title,
        published: course.published,
        createdAt: course.createdAt,
      },
      overview: {
        totalEnrollments,
        totalLessons,
        totalModules: course.modules.length,
        averageProgress: Math.round(averageProgress),
        completedEnrollments,
        completionRate: Math.round(completionRate * 10) / 10,
      },
      lessons: {
        mostPopular: mostPopularLessons,
        leastPopular: leastPopularLessons,
      },
      enrollments: {
        recent: recentEnrollments,
        trend: enrollmentTrend,
      },
      progressDistribution: progressBuckets,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch analytics",
      },
      { status: 500 }
    )
  }
}
