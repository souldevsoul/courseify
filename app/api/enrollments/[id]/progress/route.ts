import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/enrollments/[id]/progress - Mark lesson as completed
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { lessonId } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Missing lessonId' },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Add lesson to completed lessons if not already completed
    const completedLessons = enrollment.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    // Calculate total lessons in course
    const totalLessons = enrollment.course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );

    // Calculate progress percentage
    const progress = Math.round((completedLessons.length / totalLessons) * 100);

    // Update enrollment
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        completedLessons,
        progress,
        ...(progress === 100 && { completedAt: new Date() }),
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json({ enrollment: updatedEnrollment }, { status: 200 });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
