import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

// GET /api/courses - List all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const userId = searchParams.get('userId');

    // Get current user session
    const session = await getSession();
    const currentUserId = session?.user?.id;

    const courses = await prisma.course.findMany({
      where: {
        // If userId is specified, return only that user's courses
        ...(userId && { userId }),
        // If currentUserId exists and no specific userId is requested, return user's own courses
        ...(!userId && currentUserId && { userId: currentUserId }),
        // If published filter is set, apply it
        ...(published === 'true' && { published: true }),
        // If category filter is set, apply it
        ...(category && { category }),
      },
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
            lessons: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            modules: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, description, category, difficultyLevel, thumbnailUrl, price } = body;

    if (!userId || !title || !description || !category || !difficultyLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        userId,
        title,
        description,
        category,
        difficultyLevel,
        thumbnailUrl,
        price: price ? parseFloat(price) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
