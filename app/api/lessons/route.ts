import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/lessons - Create a new lesson
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, title, content, lessonType, videoUrl, slideUrl, duration, order } = body;

    if (!moduleId || !title || !content || !lessonType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        content,
        lessonType,
        videoUrl,
        slideUrl,
        duration: duration ? parseInt(duration) : null,
        order: order || 0,
      },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}
