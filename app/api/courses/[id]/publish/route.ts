import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';

// POST /api/courses/[id]/publish - Publish course
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Check if user owns the course
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    if (course.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Validate course has content
    if (course.modules.length === 0) {
      return NextResponse.json(
        { error: 'Cannot publish course without modules' },
        { status: 400 }
      );
    }

    const hasLessons = course.modules.some(module => module.lessons.length > 0);
    if (!hasLessons) {
      return NextResponse.json(
        { error: 'Cannot publish course without lessons' },
        { status: 400 }
      );
    }

    // Publish the course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { published: true },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    return NextResponse.json({ course: updatedCourse }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.error('Error publishing course:', error);
    return NextResponse.json(
      { error: 'Failed to publish course' },
      { status: 500 }
    );
  }
}

// POST /api/courses/[id]/unpublish - Unpublish course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Check if user owns the course
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    if (course.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Unpublish the course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { published: false },
    });

    return NextResponse.json({ course: updatedCourse }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.error('Error unpublishing course:', error);
    return NextResponse.json(
      { error: 'Failed to unpublish course' },
      { status: 500 }
    );
  }
}
